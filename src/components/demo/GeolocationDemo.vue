<script setup lang="ts">
const location = ref('未知')

async function getGeolocation(latitude: number, longitude: number) {
  try {
    const response = await fetch(`/map/reverse_geocoding/v3/?ak=${import.meta.env.VITE_BAIDU_MAP_API_KEY}&coordtype=wgs84ll&output=json&location=${latitude},${longitude}`, {
      method: 'GET',
    })

    const { result: { formatted_address } } = await response.json()

    return formatted_address as string
  }
  catch (e) {
    location.value = '获取位置失败'
    console.log(e)
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
      location.value = '获取中...'
      console.log(latitude, longitude)
      // const address = await getGeolocation(latitude, longitude)
      // address && (location.value = address)
    }, (error: GeolocationPositionError) => {
      switch (error.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          location.value = '请允许地理位置权限'
          break
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          location.value = '位置信息不可用'
          break
        case GeolocationPositionError.TIMEOUT:
        default:
          location.value = '获取位置超时'
          break
      }
    }, {
      timeout: 3000,
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
