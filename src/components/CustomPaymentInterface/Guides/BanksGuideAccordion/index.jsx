import BcaGuide from "./BanksGuide/BcaGuide";
import BniGuide from "./BanksGuide/BniGuide";
import BriGuide from "./BanksGuide/BriGuide";
import CimbGuide from "./BanksGuide/CimbGuide";
import PermataGuide from "./BanksGuide/PermataGuide";

const BanksGuideAccordion = ({ bank }) => {
  return (
    <>
      {bank === "BCA" && <BcaGuide />}
      {bank === "BNI" && <BniGuide />}
      {bank === "BRI" && <BriGuide />}
      {bank === "CIMB" && <CimbGuide />}
      {bank === "Permata" && <PermataGuide />}
    </>
  );
};

export default BanksGuideAccordion;
