import ResumeUploader from './ResumeUploader';
import Sidebar from './SideNavBar';

const Parser = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="flex-1 p-8 ml-64">
        <ResumeUploader/>
      </main>
    </div>
  );
}

export default Parser