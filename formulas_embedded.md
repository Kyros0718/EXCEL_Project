#  𝗘𝗠𝗕𝗘𝗗𝗗𝗘𝗗 𝗙𝗢𝗥𝗠𝗨𝗟𝗔𝗦
<table>
  <tr>
    <td width="500px" align="left">
      <a href="./README.md">𝗠𝗔𝗜𝗡 𝗣𝗔𝗚𝗘</a>  
    </td>
    <td width="500px" align="right">
      <a href="./formulas_conditional_format.md">𝗖𝗢𝗡𝗗𝗜𝗧𝗜𝗢𝗡𝗔𝗟 𝗙𝗢𝗥𝗠𝗔𝗧</a>
    </td>
  </tr>
</table>

```js
// {RED} – GradeBook Range
=LET(
     gradebookTable,A1:H50,
          leftopPosition, ADDRESS(ROW(INDEX(gradebookTable,1,1)), COLUMN(INDEX(gradebookTable,1,1)), 4),
          rightbottomPosition, ADDRESS(ROW(INDEX(gradebookTable,ROWS(gradebookTable),1)), COLUMN(INDEX(gradebookTable,1,COLUMNS(gradebookTable))), 4),

     leftopPosition & ":" & rightbottomPosition
     )


// {ORANGE} – Required Percentage To reach "Desired Grade"
=LET(
     buttonGrade, F62:F63,
          one,INDEX(buttonGrade, 1, 1),
          letterGrade, INDIRECT(ADDRESS(ROW(one), COLUMN(one), 4)),
          buttonPressed, INDIRECT(ADDRESS(ROW(INDEX(buttonGrade, 2, 1)), COLUMN(one), 4)),
     scoreAvg, G52:H61,
          score, INDEX(scoreAvg, 0, 1),
          points, INDEX(scoreAvg, 0, 2),
     gradeScale, A52:B60,

     IFERROR(
          IF(letterGrade,
               (VLOOKUP(buttonPressed, gradeScale, 2, FALSE) - (SUM(score) - score)) / points,
               ""
               ),
          ""
          )
     )


// {YELLOW} – Category Generator
=LET(
     dataGradebookTable, INDIRECT(E63),
          assignments, INDEX(dataGradebookTable, 0, 1),
          trimAssignments, FILTER(assignments, assignments <> ""),
          labels, IFERROR(TEXTBEFORE(trimAssignments, " "), trimAssignments),

     UNIQUE(FILTER(labels, labels <> ""))
     )


// {GREEN} – Category Averages
=LET(
     gradeBreakdownTable, E52:H61,
          labelList, INDEX(gradeBreakdownTable, 0, 1),
          weight, INDEX(gradeBreakdownTable, 0, COLUMNS(gradeBreakdownTable)),
     dataGradebookTable, INDIRECT(E63),
          score, INDEX(dataGradebookTable, 0, COLUMNS(dataGradebookTable) - 1),
          points, INDEX(dataGradebookTable, 0, COLUMNS(dataGradebookTable)),
          labels, IFERROR(
                    TEXTBEFORE(INDEX(dataGradebookTable, 0, 1)," "),
                    INDEX(dataGradebookTable, 0, 1)
                    ),

     BYROW(labelList,
          LAMBDA(label,
               IF(label <> "",
                    LET(
                         idx, ROW(label) - ROW(INDEX(labelList, 1, 1)) + 1,
                         labelScores, FILTER(score, labels = label),
                         labelPoints, FILTER(points, labels = label),

                         IF(SUM(labelPoints) = 0,
                              "",
                              SUM(labelScores) / SUM(labelPoints) * INDEX(weight, idx)
                              )
                         ),
                    ""
                    )
               )
          )
     )


// {BLUE} – Total Sum Of Scores with Total Sum of Points
=BYCOL(G52:H61, LAMBDA(col, SUM(col)))


// {INDIGO} – Letter Grade Estimation
=LET(
     avgFinalScore, G62,
     gradeSCale, A52:B60,
     letterGrade, INDEX(gradeSCale,0,1),
     gradingRubric, INDEX(gradeSCale,0,2),

     XLOOKUP(avgFinalScore, gradingRubric, letterGrade, 0, -1)
     )


// {VIOLET} – Reverse Calculation For Desired Grade
=LET(
     buttonToggle, F62,
     dataGradebookTable, INDIRECT(E63),
     rowLabels, IFERROR(TEXTBEFORE(INDEX(dataGradebookTable,,1), " "), ""),
     rowPoints, INDEX(dataGradebookTable,, COLUMNS(dataGradebookTable)),
     rowScores, INDEX(dataGradebookTable,, COLUMNS(dataGradebookTable) - 1),

     percentageLabel, D52:E61,
     percentageList, INDEX(percentageLabel,,1),
     labelList, INDEX(percentageLabel,,2),

     IF(buttonToggle,
        BYROW(dataGradebookTable,
             LAMBDA(row,
                  LET(
                       label, IFERROR(TEXTBEFORE(INDEX(row,1), " "), TRIM(INDEX(row,1))),
                       isTarget, rowLabels = label,
                       inputScores, IFERROR(FILTER(rowScores, NOT(ISFORMULA(rowScores)) * isTarget),0),
                       inputPoints, IFERROR(FILTER(rowPoints, NOT(ISFORMULA(rowScores)) * isTarget),0),
                       remainingPoints, FILTER(rowPoints, ISFORMULA(rowScores) * isTarget),
                       desiredPercentage, IFERROR(XLOOKUP(label, labelList, percentageList), 0),
                       currentScore, INDEX(row, COLUMNS(dataGradebookTable) - 1),
                       currentPoint, INDEX(row, COLUMNS(dataGradebookTable)),
                       calculation, IF(NOT(SUM(inputScores)),
                                 desiredPercentage * currentPoint,
                                 (desiredPercentage * SUM(inputPoints, remainingPoints) - SUM(inputScores)) / SUM(remainingPoints) * currentPoint
                                 ),

                       IF(ISFORMULA(currentScore) * (label <> ""), calculation, "")
                  )
             )),
        ""
     )
)
