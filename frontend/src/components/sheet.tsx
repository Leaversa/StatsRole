interface IProps {
  section: Record<string, unknown>;
  header: string;
}

type CharacterType = {
  Name: string;
  Type: string;
  Alignment: string;
  Description: string;
  HP: number;
  Defense: number;
  Speed: number;
  Statistics: Record<string, number>;
  Abilities: Record<string, string>;
  Actions: Record<string, string>;
  [key: string]: string | number | object;
};

const Divider = () => {
  return (
    <svg height="5" width="100%" className="fill-primary">
      <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
  );
};

const Section: React.FC<IProps> = ({ section, header }) => {
  return (
    <section>
      <h2 className="font-semibold text-xl">{header}</h2>
      <Divider />
      <div className="flex flex-col gap-2">
        {Object.entries(section).map(([key, value]) => {
          return (
            <div className="flex gap-2">
              <p className="font-bold">{key}.</p>
              <p>{value as string}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
const Statistics: React.FC<IProps> = ({ section, header }) => {
  const modiferCalc = (value: number) => {
    const mod = Math.floor((value - 10) / 2);
    return mod > 0 ? `+${mod}` : mod;
  };

  return (
    <section>
      <h2 className="font-semibold text-xl">{header}</h2>
      <Divider />
      <div className="flex justify-around w-full flex-wrap">
        {Object.entries(section).map(([key, value]) => {
          return (
            <div className="px-3">
              <p className="font-bold">{key}</p>
              <p className="text-center">
                {value as string} ({modiferCalc(value as number)})
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

function filterNonObjects(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => typeof value !== "object")
  );
}

function filteroutObject(obj: Record<string, unknown>, filterList: string[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !filterList.includes(key))
  );
}

const CharacterInfo = ({ character }: { character: CharacterType }) => {
  return (
    <article className="bg-orange-100 text-primary shadow-xl shadow-yellow-950/50 w-fit mx-auto">
      <hr className="bg-yellow-500 h-1 border-none" />
      <div className="p-5">
        <h2 className="text-3xl font-semibold font-display">{character.Name}</h2>
        <p>
          {character.Type}, {character.Alignment}
        </p>
        <Section
          section={filteroutObject(filterNonObjects(character), [
            "Name",
            "Type",
            "Alignment",
          ])}
          header={"General"}
        />
        <Statistics section={character.Statistics} header={"Statistics"} />
        <Section section={character.Abilities} header={"Abilities"} />
        <Section section={character.Actions} header={"Actions"} />
      </div>
      <hr className="bg-yellow-500 h-1 border-none" />
    </article>
  );
};

export default CharacterInfo;
