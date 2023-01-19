<script setup lang="ts">
import Ac from '~/components/index/Ac.vue';

import schemaImg from '~/assets/elk-schema.png';

import katex from 'katex';

const nano = (v: number) => v / 10 ** 9;
const kilo = (v: number) => v * 10 ** 3;

const C = nano(10);
const R4 = kilo(22);

const qInput = $ref('1');
const w0Input = $ref('5000');

const inputToNum = (str: string) => {
  if (!str) {
    return 0;
  }

  const num = Number(str);

  if (Number.isNaN(num)) {
    return 0;
  }

  return num;
};

const q = $computed(() => inputToNum(qInput));
const w0 = $computed(() => inputToNum(w0Input));

const r = $computed(() => {
  const rcproduct = 1 / w0;
  return roundResult(rcproduct / C);
});

const r3 = $computed(() => {
  const divider = 2 - 1 / q;
  return roundResult(R4 / divider);
});

const isInputValid = $computed(() =>
  [w0, r, r3].every((v) => v > 0 && v !== Number.POSITIVE_INFINITY)
);

const expression = (str: string) => katex.renderToString(str);
</script>

<template>
  <div _flex="~ col" _items-center _gap12>
    <div _text-2xl>ELK - Projekt nr 12</div>

    <div
      :style="{ backgroundImage: `url(${schemaImg})` }"
      _bg="cover center no-repeat"
      _rounded
      _h50
      _w80
      _my--4
    />

    <div
      _flex="~ col"
      _items-center
      _gap6
      _text-lg
      _children="flex-(~ col) items-center gap2"
    >
      <div>
        <div _text-4>dobroć filtru:</div>

        <div
          v-html="
            expression(
              'Q = \\frac{\\sqrt{R_{1}R_{2}C_{1}C_{2}}}{R_{2}C_{2} + R_{2}C_{1} + R_{1}C_{2}(1 - k)}'
            )
          "
        />
      </div>

      <div>
        <div _text-4>wzmocnienie układu aktywnego:</div>
        <div v-html="expression('k = 1 + \\frac{R_{4}}{R_{3}}')" />
      </div>

      <div>
        <div _text-4>częstość graniczna:</div>
        <div
          v-html="expression('\\omega_{0} = \\frac{1}{R_{1}R_{2}C_{1}C_{2}}')"
        />
      </div>

      <div>
        <div _text-4>
          założenia upraszczające dla zależności między elementami układu:
        </div>
        <div v-html="expression('R_{1} = R_{2} = R')" />
        <div v-html="expression('C_{1} = C_{2} = C')" />
        <div
          v-html="
            expression(
              'Q = \\frac{\\sqrt{R_{1}R_{2}C_{1}C_{2}}}{R_{2}C_{2} + R_{2}C_{1} + R_{1}C_{2}(1 - k)} = \\frac{1}{3 - k}'
            )
          "
        />
      </div>
    </div>

    <div _flex="~ col" _items-center _gap2>
      <div _text-xl>Dobór wybranych parametrów filtru</div>

      <div v-html="expression('C = 10nF')" />
      <div v-html="expression('R_{4} = 22k\\Omega')" />
    </div>

    <div _flex="~ col" _items-center _gap4 _children="flex gap4 items-center">
      <div _text-xl>Dane wejściowe</div>

      <div>
        <div v-html="expression('Q =')" />
        <BaseInput v-model="qInput" />
      </div>

      <div>
        <div v-html="expression('w_{0} =')" />
        <BaseInput v-model="w0Input" />
      </div>
    </div>

    <BaseFadeTransition>
      <div v-if="isInputValid" _flex="~ col" _items-center _gap12>
        <div _flex="~ col" _items-center _gap4>
          <div _text-xl>Dane wyjściowe</div>

          <div v-html="expression(`R = ${r}\\Omega`)" />

          <div v-html="expression(`R_{3} = ${r3}\\Omega`)" />
        </div>

        <div _flex="~ col" _items-center _gap4>
          <div _text="xl center">Charakterystyka amplitudowa</div>

          <Ac :c1="C" :c2="C" :r1="r" :r2="r" :r3="r3" :r4="R4" />
        </div>
      </div>

      <div v-else _text="xl red" _mt--8 _h140>Niepoprawne dane</div>
    </BaseFadeTransition>
  </div>
</template>

<style lang="scss">
.katex-html {
  display: none;
}
</style>
