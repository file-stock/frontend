import Image from "next/image";
import GenericButton from "../../components/GenericButton";

import { creatorSample } from "../../public/index";

const CreatorOfTheMonth = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-3xl font-bold">Creator of the Month</div>
      <div>
        <Image src={creatorSample} width={200} height={200} alt="creator" />
      </div>
      <div className="text-center w-1/3 mb-5">
        <div className="text-2xl font-semibold mb-4">Jacob Moore</div>
        <div className=" text-lg font-medium  text-greyText">
          Lorem ipsum doarl sit delaka it timarnadrer er aslwe csderd vcd Lorem
          ipsum doarl sit delaka it timarnadrer er asLorem ipsum doarl sit
          delaka it timarnadrerslwe csderd vcd Lorem ipsum doarl sit delaka it
          tim
        </div>
      </div>
      <div>
        <GenericButton
          label="View profile"
          size="sm"
          variant="mainFull"
          onclick={() => null}
        />
      </div>
    </div>
  );
};

export default CreatorOfTheMonth;
