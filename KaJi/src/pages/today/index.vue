<template>
  <form :report-submit="true">
    <div class="container" @touchstart="touchStart" @touchend="touchEnd">
      <div class="btn-row">
        <div class="arrow-container" @click="prior">
          <span class="arrow -left" :class="{ '-disable': reachTheStart }"></span>
        </div>
        <span class="show-title">
          <span @click="showCalendar = true">{{selectedDate}}</span>
        </span>
        <div class="arrow-container" @click="next">
          <span class="arrow -right" :class="{ '-disable': reachTheEnd }"></span>
        </div>
      </div>
      <photo v-if="photo" :photo="photo"></photo>
      <a v-else-if="reachTheEnd" class="empty-photo" href="/pages/photo-edit/main" hover-class="none">
        <ripple type="circle">
          <big-image text="点击发表今日记忆～" src="/static/picture/camera.png" :img-shake="true"></big-image>
        </ripple>
      </a>
      <div v-else class="empty-photo">
        <big-image src="/static/picture/not_photo.jpg" text="这一天没有上传照片" text-color="#1c2438"></big-image>
      </div>
    </div>
    <div :class="showCalendar ? 'calendar-visible' : 'calendar-hidden'">
      <calendar @close="showCalendar = false"></calendar>
    </div>
  </form>
</template>

<script>
import { addDays, isSameDay, isToday, subDays } from 'date-fns';
import ripple from 'mpvue-ripple';
import { mapGetters, mapMutations, mapState } from 'vuex';

import photo from './photo';
import store from '../../store';
import calendar from '../../components/calendar';
import bigImage from '../../components/big-image';

export default {
  components: {
    bigImage,
    ripple,
    photo,
    calendar,
  },

  store,

  data() {
    return {
      showCalendar: false,
      startPageX: 0,
    };
  },

  computed: {
    ...mapGetters(['selectedDate', 'firstMonthInTimeline']),
    ...mapState({
      date: state => state.timeline.selected.date,
      photo: state => state.timeline.selected.photo,
    }),

    reachTheStart() {
      return isSameDay(this.date, this.firstMonthInTimeline);
    },
    reachTheEnd() {
      return isToday(this.date);
    },
  },

  methods: {
    ...mapMutations(['setSelectedDate']),

    next() {
      if (!this.reachTheEnd) {
        this.setSelectedDate(addDays(this.date, 1));
      }
    },
    prior() {
      if (!this.reachTheStart) {
        this.setSelectedDate(subDays(this.date, 1));
      }
    },
    touchStart(event) {
      this.startPageX = event.mp.changedTouches[0].pageX;
    },
    touchEnd(event) {
      const offsetX = this.startPageX - event.mp.changedTouches[0].pageX;
      if (offsetX > 50) {
        this.next();
      } else if (offsetX < -50) {
        this.prior();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../theme';

page {
  width: 100%;
  height: 100%;
  background-color: $background-color;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.btn-row {
  display: flex;
  width: 320px;
  margin: 10px;
  align-items: center;

  .arrow-container {
    flex: 0 0 20%;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .arrow {
    border-right: 3px solid;
    border-bottom: 3px solid;
    height: 10px;
    width: 10px;
    margin: 0 auto;

    &.-right {
      transform: rotate(-45deg);
    }

    &.-left {
      transform: rotate(135deg);
    }

    &.-disable {
      color: $disabled-color;
    }
  }
}

.show-title {
  flex: 1 1 auto;
  text-align: center;
}

.empty-photo {
  width: 320px;
  padding: 100px 0;
}

.calendar-visible {
  visibility: visible;
  opacity: 1;
  transition: all 0.33s linear;
}

.calendar-hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
