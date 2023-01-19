<script setup lang="ts">
import Ac from '~/components/index/Ac.vue';

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
</script>

<template>
  <div _flex="~ col" _items-center _gap10>
    <div _flex="~ col" _items-center _gap4 _children="flex gap4">
      <div _text-xl>Dane wejściowe</div>

      <div>
        <div>Q:</div>
        <BaseInput v-model="qInput" />
      </div>

      <div>
        <div>w0:</div>
        <BaseInput v-model="w0Input" />
      </div>
    </div>

    <BaseFadeTransition>
      <div v-if="isInputValid" _flex="~ col" _items-center _gap12>
        <div _flex="~ col" _items-center _gap4 _children="flex gap4">
          <div _text-xl>Dane wyjściowe</div>

          <div>
            <div>R:</div>
            <div>{{ r }}</div>
          </div>

          <div>
            <div>R3:</div>
            <div>{{ r3 }}</div>
          </div>
        </div>

        <div _flex="~ col" _items-center _gap4>
          <div _text="xl center">Charakterystyka amplitudowa</div>

          <Ac :c1="C" :c2="C" :r1="r" :r2="r" :r3="r3" :r4="R4" />
        </div>
      </div>

      <div v-else _text="xl red">Niepoprawne dane</div>
    </BaseFadeTransition>
  </div>
</template>
