# Back End of Grade Pilot
<table>
  <tr>
    <td width="500px" align="left">
      <a href="https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/panel_frontend.md">𝗙𝗥𝗢𝗡𝗧 𝗘𝗡𝗗</a>
    </td>
    <td width="500px" align="right">
      <a href="https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/README.md">𝗠𝗔𝗜𝗡 𝗣𝗔𝗚𝗘</a>  
    </td>
  </tr>
</table>

<div align="center">
<img src= https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/backendcolorschemes.png width=400>
</div>

## $\color{GreenYellow}{\textsf{COLOR SCHEMES:}}$
- Every colored cell contains embedded formulas tied to its specific function.
- Grey Cells are user-controlled inputs from the **[FrontEnd](https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/panel_frontend.md)** and should only be changed manually. 

## $\color{GreenYellow}{\textsf{FORMULAS:}}$

## GradeBook Range _(Semi-Automatic Setup Required)_
> ⚠️ You must manually scale the range to cover all Assignment's: Task, Scores, and Points
> 
> 🧩 This step is required to define the boundary for dynamic calculations
> 
> ✅ Designed to be easy to resize—just drag to include all rows
> 
> <img src=https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/blockRangeGradeBookTable.png >

## Automatic Required Average Percentage per Generated Category
> Shows how much % each category must contribute to reach "Desired Grade"
> 
> <img src= https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/desiredPercentage.png>


## Automatic Category Recognition & Generation
>⚠️ Naming Consistency required — make sure the first word in each assignment name matches the category exactly (e.g., HW 1, HW 2, etc.)
>
>🧩 Detects the first word of each assignment to generate its corresponding category
>
><img src= https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/assignementCategoryGenerator.png>

## Automatic Average Score Calculation per Generatorated Category
> Computes total average points earned from all assignment corresponding to their categegory
>
> <img src= https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/avgScoreGenerator.png>

## Average Numerical Grade Estimation
> Calculates your total earned score and total possible points
>
> <img src= https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/totalScoreAndPoints.png>

## Average Letter Grade Estimation
> Converts numerical score into letter grade using inputed grade scale
>
> <img src= https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/letterGradeEstimation.png>

## Automatic Reverse Grade Calculator
> Enter a target letter grade
> 
> Calculates required scores on future assignments to meet that grade
>
> <img src= https://github.com/Kyros0718/Excel_Projects/blob/main/Grade_Pilot/images/reverseScoreCalculator.png>
