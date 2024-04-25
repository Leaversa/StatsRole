type CharacterType = {
  Name: string;
  Type: string;
  Statistics: SectionType;
  [key: string]: string | number | object;
};

const Divider = () => {
  return (
    <svg height="5" width="100%" className="fill-primary">
      <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
  );
};

type SectionType = {
  [key: string]: string | number;
};

const Section = ({
  section,
  header,
}: {
  section: SectionType;
  header: string;
}) => {
  console.log(section);
  return (
    <>
      <h2 className="font-semibold">{header}</h2>
      <Divider />
      {Object.entries(section).map(([key, value]) => {
        return (
          <div>
            <p>
              <strong>{key}</strong> {value}
            </p>
          </div>
        );
      })}
    </>
  );
};

const CharacterInfo = ({ character }: { character: CharacterType }) => {
  return (
    <div className="bg-orange-100 p-5 text-primary shadow-xl shadow-yellow-950/50">
      <h2 className="text-3xl font-semibold font-serif">{character.Name}</h2>
      <p>{character.Type}</p>
      <p>
        <Section section={character.Statistics} header={"Statistics"} />
        {Object.entries(character).map(([key, value]) => {
          if (key === "Name" || key === "Type" || key === "Statistics") {
            return null;
          }
          if (typeof value === "string" || typeof value === "number") {
            return (
              <>
                <strong>{key} </strong>
                {value}
                <br />
              </>
            );
          }
          if (typeof value === "object") {
            return (
              <>
                <h2 className="font-bold text-xl">{key}</h2>
                <Divider />
                {Object.entries(value).map(([subKey, subValue]) => (
                  <>
                    <strong>{subKey}. </strong> {subValue}
                    <br />
                  </>
                ))}
              </>
            );
          }
        })}
      </p>
    </div>
  );
};

export default CharacterInfo;
