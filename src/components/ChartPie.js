import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const ChartPie = (props) => {
  const radius = 45;
  const circleCircumference = 2 * Math.PI * radius;

  const protein = props.data.protein;
  const carbs = props.data.carbs;
  const fat = props.data.fat;
  const sugar = props.data.sugar;
  const total = sugar + protein + carbs + fat;
  // const rest = 100 - (sugar + protein + carbs + fat);
  // const total = 0;

  const proteinPercentage = (protein / total) * 100;
  const carbsPercentage = (carbs / total) * 100;
  const fatPercentage = (fat / total) * 100;
  const sugarPercentage = (sugar / total) * 100;

  const proteinStrokeDashoffset =
    circleCircumference - (circleCircumference * proteinPercentage) / 100;
  const carbsStrokeDashoffset =
    circleCircumference - (circleCircumference * carbsPercentage) / 100;
  const fatStrokeDashoffset =
    circleCircumference - (circleCircumference * fatPercentage) / 100;
  const sugarStrokeDashoffset =
    circleCircumference - (circleCircumference * sugarPercentage) / 100;

  const proteinAngle = (protein / total) * 360;
  const carbsAngle = ((carbs / total) * 360) + proteinAngle;
  // const fatAngle = (fat / total) * 360;
  const fatAngle = ((fat / total) * 360) + carbsAngle;

  // console.log(proteinAngle, carbsAngle, fatAngle, sugarAngle, reastAngle)
  // const fatAngle = proteinAngle + carbsAngle;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#3a47ff"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={proteinStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="flat"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#34ff86"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={carbsStrokeDashoffset}
                  rotation={proteinAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="flat"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#ffca39"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={fatStrokeDashoffset}
                  rotation={carbsAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="flat"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#ff1f1f"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={sugarStrokeDashoffset}
                  rotation={fatAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="flat"
                />
              </>
            )
            }
          </G>
        </Svg>
      </View>
    </View>
  );
};

export default ChartPie;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});