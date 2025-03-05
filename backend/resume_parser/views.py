# # from rest_framework.views import APIView
# from rest_framework.parsers import MultiPartParser
# from rest_framework.response import Response
# from rest_framework import status
# import textract
# import tempfile
# import os
# import magic
# import chardet
# from .services import ResumeParser
# from .serializers import ResumeUploadSerializer

# ALLOWED_MIME_TYPES = [
#     'application/pdf',
#     'text/plain',
#     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
# ]

# class ResumeParserAPI(APIView):
#     parser_classes = (MultiPartParser,)
#     serializer_class = ResumeUploadSerializer

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         uploaded_file = request.FILES['resume']

#         # Validate file type
#         mime_type = magic.from_buffer(uploaded_file.read(1024), mime=True)
#         uploaded_file.seek(0)

#         if mime_type not in ALLOWED_MIME_TYPES:
#             return Response(
#                 {"error": "Unsupported file type"},
#                 status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
#             )

#         # Process file
#         try:
#             with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
#                 for chunk in uploaded_file.chunks():
#                     tmp_file.write(chunk)
#                 tmp_path = tmp_file.name

#             # Extract raw bytes from file
#             raw_data = textract.process(tmp_path)
#             os.unlink(tmp_path)  # Clean up temp file

#             # Detect encoding with fallback to latin-1
#             detected_encoding = chardet.detect(raw_data)['encoding']
#             if not detected_encoding:
#                 detected_encoding = 'latin-1'

#             # Attempt decoding with priority:
#             # 1. Detected encoding (ignore errors)
#             # 2. UTF-8 (replace errors)
#             # 3. Latin-1 (never fails)
#             try:
#                 text = raw_data.decode(detected_encoding, errors='ignore')
#             except (UnicodeDecodeError, LookupError, TypeError):
#                 try:
#                     text = raw_data.decode('utf-8', errors='replace')
#                 except:
#                     text = raw_data.decode('latin-1', errors='replace')

#             # Parse text with spaCy model
#             parser = ResumeParser()
#             result = parser.parse_resume(text)

#             return Response(result, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response(
#                 {"error": f"Unexpected error: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
import PyPDF2
import tempfile
import os
import magic
import chardet
from docx import Document  # For handling .docx files
from .services import ResumeParser
from .serializers import ResumeUploadSerializer

ALLOWED_MIME_TYPES = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]


class ResumeParserAPI(APIView):
    parser_classes = (MultiPartParser,)
    serializer_class = ResumeUploadSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        uploaded_file = request.FILES['resume']

        # Validate file type
        mime_type = magic.from_buffer(uploaded_file.read(1024), mime=True)
        uploaded_file.seek(0)

        if mime_type not in ALLOWED_MIME_TYPES:
            return Response(
                {"error": "Unsupported file type"},
                status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
            )

        # Process file
        try:
            with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                for chunk in uploaded_file.chunks():
                    tmp_file.write(chunk)
                tmp_path = tmp_file.name

            # Extract text based on file type
            text = ""

            if mime_type == 'application/pdf':
                with open(tmp_path, "rb") as file:
                    reader = PyPDF2.PdfReader(file)
                    for page_num in range(len(reader.pages)):
                        page = reader.pages[page_num]
                        text += page.extract_text()

            elif mime_type == 'text/plain':
                with open(tmp_path, "r", encoding="utf-8") as file:
                    text = file.read()

            elif mime_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                doc = Document(tmp_path)
                for para in doc.paragraphs:
                    text += para.text

            os.unlink(tmp_path)  # Clean up temp file

            # Detect encoding with fallback to latin-1
            detected_encoding = chardet.detect(text.encode())['encoding']
            if not detected_encoding:
                detected_encoding = 'latin-1'

            # No need to decode since it's already a string
            # The text is now ready to be used directly

            # Parse text with spaCy model
            parser = ResumeParser()
            result = parser.parse_resume(text)

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"Unexpected error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
