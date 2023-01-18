<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';

import { generateACAnalysisValues } from '~/helpers/ac';

import type { ChartData, ChartOptions } from 'chart.js';

const { c1, c2, r1, r2, r3, r4 } = defineProps<{
  c1: number;
  c2: number;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
}>();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const analysisValues = $computed(() =>
  generateACAnalysisValues(c1, c2, r1, r2, r3, r4)
);

const data = $computed<ChartData<'line'>>(() => ({
  labels: analysisValues.x,
  datasets: [
    {
      label: 'Charakterystyka amplitudowa',
      data: analysisValues.y,
      borderColor: '#f00',
      pointBackgroundColor: '#f00',
      pointBorderWidth: 0,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
  ],
}));

const OPTIONS: ChartOptions<'line'> = {
  scales: {
    y: {
      title: {
        text: 'dB',
        display: true,
      },
    },
    x: {
      title: {
        text: 'log10(Frequency in Hz)',
        display: true,
      },
      ticks: {
        autoSkip: true,
        autoSkipPadding: 20,
      },
    },
  },
};
</script>

<template>
  <div _w200 _h80 _flex _justify-center>
    <Line :data="data" :options="OPTIONS" />
  </div>
</template>
