# CONDITIONAL FORMAT

<table>
  <tr>
    <td width="500px" align="left">
      <a href="./formulas_embedded.md">𝗘𝗠𝗕𝗘𝗗𝗗𝗘𝗗 𝗙𝗢𝗥𝗠𝗨𝗟𝗔𝗦</a>
    </td>
    <td width="500px" align="right">
      <a href="./README.md">𝗠𝗔𝗜𝗡 𝗣𝗔𝗚𝗘</a>  
    </td>
  </tr>
</table>

```js
// Manual Score Dettector
Applied Cell
  G1:G62
Format
  =NOT(ISFORMULA(G1))*ISNUMBER(G1)


// Reverse Calculator: Points Limit Detector 
Applied Cell
  F1:F50
Format
  =OR(AND(ISNUMBER(F1),(F1>H1)),F1<0)


// Reverse Calculator: Prediction Limit Detector
Applied Cell (separately)
  D52:D61
Format
  =OR(D52>1,D52<0)


// Table Decoration: Percent Prediction to Category
Applied Cell
  D52:E61
Format
  =D52<>""


// Category-Score-Points Detector
Applied Cell
  E52:E61
  F52:F61
  G52:G61
  H52:H61
Format
  =ISTEXT(E52)


// Toggle Button Detector
Applied Cell
  F63
Format
  =F62
```
