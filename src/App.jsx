import Masthead from "./components/Masthead";
import LeadDispatch from "./components/LeadDispatch";
import CaseStudies from "./components/CaseStudies";
import TransmissionDesk from "./components/TransmissionDesk";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Masthead />
      <main>
        <LeadDispatch />
        <CaseStudies />
        <TransmissionDesk />
      </main>
      <Footer />
    </>
  );
}
