import { SectionsProps } from "./sheet.type";
import Divider from "./divider";

function modiferCalc(value: number) {
  const mod = Math.floor((value - 10) / 2);
  return mod > 0 ? `+${mod}` : mod;
}

export const Section: React.FC<SectionsProps> = ({ section, header, type }) => {
  return (
    <section>
      <h2 className="font-semibold text-xl">{header}</h2>
      <Divider />
      {type === "statistics" ? (
        <Statistics section={section} />
      ) : (
        <div className="flex flex-col gap-2">
          {Object.entries(section).map(([key, value]) => {
            return (
              <div className="flex gap-2" key={key}>
                <p className="font-bold">{key}.</p>
                <p>{value as string}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
export const Statistics: React.FC<Omit<SectionsProps, "header">> = ({
  section,
}) => {
  return (
    <div className="flex justify-around w-full flex-wrap">
      {Object.entries(section).map(([key, value]) => {
        return (
          <div className="px-3" key={key}>
            <p className="font-bold">{key}</p>
            <p className="text-center">
              {value as string} ({modiferCalc(value as number)})
            </p>
          </div>
        );
      })}
    </div>
  );
};
