import React from "react";
import { CustomRadioButton, SVGIcon } from "components";

import { RadioGroup } from "@material-ui/core";
import ICONS from "components/SVGIcon/icons";
interface Props {
  onChange: (e: any) => void;
  distribution: "Uniform" | "Normal" | "Positive" | "Negative";
}

function DistributionsContainer({ onChange, distribution }: Props) {
  return (
    <div>
      <RadioGroup
        aria-label="Distribution"
        name="distribution"
        value={distribution}
        onChange={onChange}
        row
      >
        {["Uniform", "Normal", "Positive", "Negative"].map((item) => (
          <CustomRadioButton
            id={`scaled_distr_${item.toLowerCase()}`}
            label={
              <>
                {item}{" "}
                <SVGIcon
                  color="white"
                  icon={(ICONS as any)[item.toUpperCase()]}
                />
              </>
            }
            value={item}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default DistributionsContainer;
