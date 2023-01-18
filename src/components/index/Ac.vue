<script setup lang="ts">
import { Chart, Line, Grid } from 'vue3-charts';

import { generateACAnalysisValues } from '~/helpers/ac';

const { c1, c2, r1, r2, r3, r4 } = defineProps<{
  c1: number;
  c2: number;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
}>();

const log = console.log;

console.log = () => {
  //
};

const analysisValues = $computed(() =>
  generateACAnalysisValues(c1, c2, r1, r2, r3, r4)
);

const data: { db: number; logf: number }[] = [
  { db: 4, logf: 0.4 },
  { db: 5, logf: 0.1 },
  { db: 3, logf: 0.2 },
  { db: 2, logf: 0.3 },
  { db: 1, logf: 0.1 },
];
</script>

<template>
  <div>
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
  </div>
</template>
