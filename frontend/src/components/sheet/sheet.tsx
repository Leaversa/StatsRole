import { blacklistObjectKeys, filterNonObjects } from "@/lib/utils.ts";
import { CharacterProps } from "./sheet.type.ts";
import { Section } from "./sheetSections.tsx";

const CharacterInfo = ({ character }: { character: CharacterProps }) => {
  const blacklistedKeys = ["Name", "Type", "Alignment"];
  const generalSection = blacklistObjectKeys(
    filterNonObjects(character),
    blacklistedKeys
  );

  return (
    <div className="px-5 pb-16">
      <article className="bg-orange-100 text-primary shadow-xl shadow-yellow-950/50 w-fit mx-auto">
        <hr className="bg-yellow-500 h-1 border-none" />
        <div className="p-5">
          <h2 className="text-3xl font-semibold font-display">
            {character.Name}
          </h2>
          <p>
            {character.Type}, {character.Alignment}
          </p>
          <Section section={generalSection} header={"General"} />
          <Section
            type="statistics"
            section={character.Statistics}
            header={"Statistics"}
          />
          <Section section={character.Abilities} header={"Abilities"} />
          <Section section={character.Actions} header={"Actions"} />
        </div>
        <hr className="bg-yellow-500 h-1 border-none" />
      </article>
    </div>
  );
};

export default CharacterInfo;
