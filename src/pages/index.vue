<script setup lang="ts">
import { Chart, Line, Grid } from 'vue3-charts';

const data: { db: number; logf: number }[] = [
  { db: 4, logf: 0.4 },
  { db: 5, logf: 0.1 },
  { db: 3, logf: 0.2 },
  { db: 2, logf: 0.3 },
  { db: 1, logf: 0.1 },
];

const log = console.log;

console.log = () => {
  //
};

const nano = (v: number) => v / 10 ** 9;
const kilo = (v: number) => v * 10 ** 3;

const C = nano(10);
const R4 = kilo(22);

const qInput = $ref('1');
const w0Input = $ref('1');

const q = $computed(() => Number(qInput));
const w0 = $computed(() => Number(w0Input));

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
    <div>
      <Chart
        :size="{ width: 500, height: 400 }"
        :data="data"
        direction="vertical"
      >
        <template #layers>
          <Grid stroke-dasharray="2,2" />
          <Line :data-keys="['db', 'logf']" />
        </template>
      </Chart>
    </div>

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
