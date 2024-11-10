export const GenderCheckbox = ({
  selectedGender,
  onCheckboxChange,
}: {
  selectedGender: "" | "male" | "female" | "other";
  onCheckboxChange: (gender: "male" | "female" | "other") => void;
}) => {
  return (
    <div className="flex gap-3">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-white">Male</span>
          <input
            type="checkbox"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
            className="checkbox border-slate-900"
          />
        </label>
      </div>

      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-white">Female</span>
          <input
            type="checkbox"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
            className="checkbox border-slate-900"
          />
        </label>
      </div>

      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-white">Other</span>
          <input
            type="checkbox"
            checked={selectedGender === "other"}
            onChange={() => onCheckboxChange("other")}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};
