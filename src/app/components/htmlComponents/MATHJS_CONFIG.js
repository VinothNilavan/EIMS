import { Config } from 'react-native-config';

const MATHJAXONLINEV3 =
  `<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\{', '\\}'], ['<equ>', '</equ>']],
    displayMath:[["$$", "$$"]]
  },
};
</script>
<script
type="text/javascript"
id="MathJax-script"
src="${Config.MatJax } "
async
></script>
<script>
MathJax.typesetPromise().then(() => {
  // modify the DOM here
  MathJax.typesetPromise();
}).catch((err) => console.log(err.message));
</script>`;

//MATHJAXONLINEV3 & MATHJAXOFFLINEV3- works

export const MATHJS_CONFIG = MATHJAXONLINEV3;

export function HandleTheMathJax(data) {
  let optionVal = configOptionValue(data);

  const fracModify = str => {
    let res = str.match(/\{frac\((.*?)\|(.*?)\)\}/g);
    if (res) {
      let res1;
      for (let val of res) {
        res1 = val.split('frac')[1].replace(/[()}]/g, '');
        res1 = res1.split('|');
        res1[0] = isNaN(res1[0]) ? res1[0] : `\\text{${res1[0]}}`;
        res1[1] = isNaN(res1[1]) ? res1[1] : `\\text{${res1[1]}}`;
        res1 = `<span class="math">$\\frac {${res1[0]}}{${res1[1]}}$</span>`;
        str = str.replace(val, res1);
      }
    }
    return str;
  };

  if (optionVal.search(/frac/g) > 0) {
    optionVal = fracModify(optionVal);
  }

  /**
   * For Urdu, Math expressions will be ltr(html render direction) only
   */
  const isMath = optionVal.indexOf('class="math"');
  if (isMath > 0) {
    optionVal = optionVal.replace(
      new RegExp('<span class="math">$', 'g'),
      '<span class="math" dir="ltr">$',
    );
    optionVal = optionVal.replace(new RegExp('$</span>', 'g'), '$</span>');
  }
  return optionVal;
}

function configOptionValue(data) {
  let optionVals = data !== null && typeof data !== 'undefined' ? data : '';
  if (optionVals.search(/<equ>/g) >= 0) {
    optionVals = optionVals
      .replace(new RegExp('<equ>', 'g'), '<span class="math">$')
      .replace(new RegExp('</equ>', 'g'), '$</span>');
  }
  return optionVals;
}

export function HandleTheMathJaxEdicine(data) {
  let optionVal = data !== null && typeof data !== 'undefined' ? data : '';
  optionVal = optionVal.replace(/class='math'/gi, 'class="math"');
  const isMath = optionVal.indexOf('class="math"');
  const isFrac = optionVal.indexOf('\\over');

  if (isMath > 0 && isFrac > 0) {
    optionVal = optionVal?.split(/<span class="math">(.*?)<\/span>/g);
    const rex = /(<([^>]+)>)/gi;

    if (optionVal?.length) {
      optionVal?.forEach(function (val, key) {
        if (key % 2 === 1) {
          val = configSpanValue(val, rex);
        }
        optionVal[key] = val;
      });

      optionVal = optionVal.join(' ');
    }
  }
  return optionVal;
}

function configSpanValue(val, rex) {
  let numerator = val.replace(rex, '').split('\\over')[0];
  let denominator = val.replace(rex, '').split('\\over')[1];

  if (isNaN(numerator)) {
    numerator = `\\text{${numerator}}`;
  }
  if (isNaN(denominator)) {
    denominator = `\\text{${denominator}}`;
  }
  let newVal = `${numerator}\\over${denominator}`;
  val = '<span class="math">$' + newVal + '$</span>';
  return val;
}

