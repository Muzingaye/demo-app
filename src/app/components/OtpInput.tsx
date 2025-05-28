import React, { useRef } from "react";

type OtpInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value.replace(/\D/, "");
    if (!val) return;

    const newValue = [...value];
    newValue[index] = val;
    onChange(newValue);

    // Move to next input
    if (index < 5 && val) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-group">
        {Array.from({ length: 6 }).map((_, i) => (
          <React.Fragment key={i}>
            {i === 3 && <span className="separator">-</span>}
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[i] || ""}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="otp-input"
            />
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        .otp-container {
          display: flex;
          justify-content: center;
        }
        .otp-group {
          display: flex;
          gap: 8px;
        }
        .otp-input {
          width: 40px;
          height: 50px;
          font-size: 24px;
          text-align: center;
        }
        .separator {
          display: flex;
          align-items: center;
          padding: 0 8px;
          font-size: 24px;
        }
      `}</style>
    </div>
  );
};

export default OtpInput;
