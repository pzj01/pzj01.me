<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Coords = [number, number]

const { coords } = useGeolocation()
let map: L.Map | null

const center = computed<Coords>(() => [coords.value.latitude, coords.value.longitude])

onMounted(() => setTimeout(initMap, 300))

function initMap() {
  map = L.map('map', {
    attributionControl: false,
  }).setView(center.value, 15)

  // 添加图层
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    detectRetina: true,
  }).addTo(map)

  const icon = L.icon({
    iconUrl: '/images/marker.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  // 添加当前位置标记
  const marker = L.marker(center.value, { icon }).addTo(map)
  marker.bindPopup('这是你的位置').openPopup()
}

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div id="map" rounded-lg h-96 />
</template>
