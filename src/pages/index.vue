<script setup lang="ts">
import Ac from '~/components/index/Ac.vue';

const nano = (v: number) => v / 10 ** 9;
const kilo = (v: number) => v * 10 ** 3;

const C = nano(10);
const R4 = kilo(22);

const qInput = $ref('1');
const w0Input = $ref('1');

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
</script>

<template>
  <div _flex="~ col" _items-center _gap4>
    <Ac :c1="C" :c2="C" :r1="r" :r2="r" :r3="r3" :r4="R4" />

    <div _flex="~ col" _items-center _gap4 _children="flex gap4">
      <div>
        <div>Q:</div>
        <BaseInput v-model="qInput" />
      </div>

      <div>
        <div>w0:</div>
        <BaseInput v-model="w0Input" />
      </div>

      <div>
        <div>r:</div>
        <div>{{ r }}</div>
      </div>

      <div>
        <div>r3:</div>
        <div>{{ r3 }}</div>
      </div>
    </div>
  </div>
</template>
