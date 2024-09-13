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
      const address = await getGeolocation(latitude, longitude)
      address && (location.value = address)
    }, (error) => {
      location.value = '请打开地理位置权限'
      console.log(error)
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
