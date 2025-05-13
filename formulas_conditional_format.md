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
  G1:G30
Format
  =NOT(ISFORMULA(G1))


// Reverse Calculator: Points Limit Detector 
Applied Cell
  F1:F30
Format
  =OR(AND(ISNUMBER(F1),(F1>H1)),F1<0)


// Reverse Calculator: Prediction Limit Detector
Applied Cell (separately)
  D32:D41
Format
=OR(D32>1,D32<0)


// Table Decoration: Percent Prediction to Category
Applied Cell
  D32:E41
Format
  =D32<>""


// Category-Score-Points Detector
Applied Cell
  E32:E41
  F32:F41
  G32:G41
  H32:H41
Format
  =ISTEXT(E32)


// Toggle Button Detector
Applied Cell
  F43
Format
  =F42
```
