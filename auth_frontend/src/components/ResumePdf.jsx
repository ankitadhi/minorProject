import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";


const classicProfessional = {
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.4,
    color: "#333",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007ACC",
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#007ACC",
    borderBottomStyle: "solid",
    color: "#555",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007ACC",
    borderBottomWidth: 2,
    borderBottomColor: "#007ACC",
    borderBottomStyle: "solid",
    paddingBottom: 4,
  },
  skillItem: {
    backgroundColor: "#E3F2FD",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: "#007ACC",
    marginLeft:2,
  },
  company: {
    fontWeight: "bold",
    color: "#007ACC",
  },
};


const defaultStyles = StyleSheet.create(classicProfessional);

const ResumePDF = ({ formData, template }) => {

const parseTemplateStyles = (cssString) => {
  try {
    console.log("Raw CSS Content:", cssString); // Log raw content

    const sanitized = cssString
      .replace(/(\w+):/g, '"$1":') // Wrap keys in quotes
      .replace(/,(?=\s*})/g, "") // Remove trailing commas
      .replace(/:\s*#([0-9A-Fa-f]{6})/g, ': "#$1"'); // Ensure hex colors are strings

    console.log("Sanitized CSS Content:", sanitized); // Log sanitized content

    const parsed = JSON.parse(`{${sanitized}}`);
    console.log("Parsed CSS Object:", parsed); // Log parsed object

    return parsed;
  } catch (error) {
    console.error("Error parsing CSS content:", error);
    return null;
  }
};

  // Get styles - use parsed template or defaults
  const styles = template?.css_content
    ? StyleSheet.create(parseTemplateStyles(template.css_content))
    : defaultStyles;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{formData.full_name || "Your Name"}</Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          <Text>
            {formData.linkedin && (
              <Link
                src={
                  formData.linkedin.startsWith("http")
                    ? formData.linkedin
                    : `https://${formData.linkedin}`
                }
              >
                LinkedIn
              </Link>
            )}
            {formData.linkedin &&
              (formData.email || formData.phone || formData.address) &&
              " · "}
            {formData.email && formData.email}
            {formData.email && (formData.phone || formData.address) && " · "}
            {formData.phone && formData.phone}
            {formData.phone && formData.address && " · "}
            {formData.address && formData.address}
          </Text>
        </View>

        {/* Summary */}
        {formData.summary && (
          <View>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text>{formData.summary}</Text>
          </View>
        )}
        {/* Skills */}
        {formData.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {formData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {formData.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            {formData.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>
                    {exp.company || "Company Name"}
                  </Text>
                  <Text>{exp.duration || "Duration"}</Text>
                </View>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {exp.role || "Position"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {formData.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {formData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    {edu.degree || "Degree"}
                  </Text>
                  <Text>{edu.institution || "Institution"}</Text>
                </View>
                {edu.year && <Text>{edu.year}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {formData.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            <View style={styles.certificationList}>
              {formData.certifications.map((cert, index) => (
                <Text key={index}>• {cert}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Project Section */}
        {formData.projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {formData.projects.map((proj, index) => (
              <View key={index}>
                <Text style={styles.company}>{proj.name}</Text>
                <Text>{proj.description}</Text>
                {proj.link && <Link src={proj.link}>{proj.link}</Link>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};


export default ResumePDF;