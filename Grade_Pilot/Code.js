=LET(
     gradebookTable,A1:H41,
          leftopPosition, ADDRESS(ROW(INDEX(gradebookTable,1,1)), COLUMN(INDEX(gradebookTable,1,1)), 4),
          rightbottomPosition, ADDRESS(ROW(INDEX(gradebookTable,ROWS(gradebookTable),1)), COLUMN(INDEX(gradebookTable,1,COLUMNS(gradebookTable))), 4),

     leftopPosition & ":" & rightbottomPosition
     )


=BYROW(E43:E52, 
     LAMBDA(searchLabel,
          IF(searchLabel <> "",
               LET(
                    dataGradebookTable, INDIRECT(A52),
                         labels, IFERROR(TEXTBEFORE(INDEX(dataGradebookTable,0,1), " "), INDEX(dataGradebookTable,0,1)),
                         matchRows, FILTER(ROW(dataGradebookTable), ISNUMBER(SEARCH(searchLabel, labels))),
                         startRow, MIN(matchRows),
                         endRow, MAX(matchRows),
                         startRef, ADDRESS(startRow, COLUMN(INDEX(dataGradebookTable, 1, 1)), 4),
                         endRef, ADDRESS(endRow, COLUMN(INDEX(dataGradebookTable, 1, COLUMNS(dataGradebookTable))), 4),
                    
                    startRef & ":" & endRef
                    ),
               ""
               )
          )
     )


=LET(
     buttonGrade, I53:I54,
          one,INDEX(buttonGrade, 1, 1),
          letterGrade, INDIRECT(ADDRESS(ROW(one), COLUMN(one), 4)),
          buttonPressed, INDIRECT(ADDRESS(ROW(INDEX(buttonGrade, 2, 1)), COLUMN(one), 4)),
     scoreAvg, G43:H52,
          score, INDEX(scoreAvg, 0, 1),
          points, INDEX(scoreAvg, 0, 2),
     gradeScale, A43:B51,
     
     IFERROR(
          IF(letterGrade, 
               (VLOOKUP(buttonPressed, gradeScale, 2, FALSE) - (SUM(score) - score)) / points, 
               ""
               ),
          ""
          )
     )


=LET(
     dataGradebookTable, INDIRECT(A52),
          assignments, INDEX(dataGradebookTable, 0, 1),
          trimAssignments, FILTER(assignments, assignments <> ""),
          labels, IFERROR(TEXTBEFORE(trimAssignments, " "), trimAssignments),
     
     UNIQUE(FILTER(labels, labels <> ""))
     )


=LET(
     gradeBreakdownTable, E43:H52,
          labelList, INDEX(gradeBreakdownTable, 0, 1),
          weight, INDEX(gradeBreakdownTable, 0, COLUMNS(gradeBreakdownTable)),
     dataGradebookTable, INDIRECT(A52),
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


=BYCOL(G43:H52, LAMBDA(col, SUM(col)))


=LET(
     avgFinalScore, G53,
     gradeSCale, A43:B51,
     letterGrade, INDEX(gradeSCale,0,1),
     gradingRubric, INDEX(gradeSCale,0,2),
     
     XLOOKUP(avgFinalScore, gradingRubric, letterGrade, 0, -1)
     )


=LET(
     buttonToggle, I53,
     dataGradebookTable, INDIRECT(A52),
     rowLabels, IFERROR(TEXTBEFORE(INDEX(dataGradebookTable,,1), " "), ""),
     rowPoints, INDEX(dataGradebookTable,, COLUMNS(dataGradebookTable)),
     rowScores, INDEX(dataGradebookTable,, COLUMNS(dataGradebookTable) - 1),

     percentageLabel, D43:E52,
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
                    )
               ),
          ""
          )
     )
