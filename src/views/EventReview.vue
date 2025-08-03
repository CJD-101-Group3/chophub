<script setup>
import { reactive } from 'vue';
import Theheader from '@/components/Theheader.vue';
import Thefooter from '@/components/Thefooter.vue';
import EventBanner from '@/components/EventBanner.vue';
import FeedbackForm from '@/components/FeedbackForm.vue';

const eventDetails = reactive({
  imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1740&auto=format&fit=crop',
  imageAlt: 'A beautiful starry night over mountains',
  title: '【星空下的鍛造】夜間鑄劍體驗營',
  subtitle: '實體工作坊',
  dateTime: '2025/12/15(一) 7:00PM'
});
</script>

<template>
  <div>
    <Theheader />
    <main class="items-center justify-center bg-[#282828]" >
      <EventBanner
        :image-url="eventDetails.imageUrl"
        :image-alt="eventDetails.imageAlt"
        :title="eventDetails.title"
        :subtitle="eventDetails.subtitle"
        :date-time="eventDetails.dateTime"
        />
        
        <!-- <div class="mt-10"> -->
        <FeedbackForm/>
      <!-- </div> -->
        
    </main>
    <Thefooter />
  </div>
</template>

<style></style>