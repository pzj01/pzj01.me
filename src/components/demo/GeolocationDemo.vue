<script setup lang="ts">
const location = ref('未知')

async function getGeolocation(latitude: number, longitude: number) {
  try {
    const response = await fetch(`http://api.map.baidu.com/reverse_geocoding/v3?`, {
      method: 'GET',
    })

    const json = await response.json()

    console.log(json)
  }
  catch (e) {
    location.value = '获取位置失败'
    console.error(e)
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      getGeolocation(latitude, longitude)
    }, (error) => {
      location.value = '请打开地理位置权限'
      console.error(error)
    })
  }
}
</script>

<template>
  <div space-y-4>
    <span>当前位置: {{ location }}</span>
    <button btn @click="getLocation">
      <i i-ri-map-pin-line />
      获取地理位置
    </button>
  </div>
</template>
