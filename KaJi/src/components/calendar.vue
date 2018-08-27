<template>
  <div class="calendar-mask" @touchstart="touchStart" @touchend="touchEnd">
    <div class="calendar-wrapper">
      <div class="top">
        <span class="title">{{title}}</span>
        <span class="spacer"></span>
        <img class="icon" src="/static/icons/today.png" @click="today">
        <span class="arrow -left" :class="{ '-disable': reachTheStart }" @click="prior"></span>
        <span class="arrow -right" :class="{ '-disable': reachTheEnd }" @click="next"></span>
      </div>
      <div class="row">
        <div class="week">日</div>
        <div class="week">一</div>
        <div class="week">二</div>
        <div class="week">三</div>
        <div class="week">四</div>
        <div class="week">五</div>
        <div class="week">六</div>
      </div>
      <div class="row" v-for="(chunk, chunkIndex) in dayChunks" :key="chunkIndex">
        <div class="day" v-for="(day, dayIndex) in chunk" :key="dayIndex" @click="day.isFuture ? null : click(day)"
             :class="{ '-other': !day.isSameMonth, '-select': day.isSelect, '-today': day.isToday, '-mark': !!day.photo, '-future': day.isFuture }">
          {{day.date}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addMonths,
  eachDay,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  isSameMonth,
  isThisMonth,
  isToday,
  lastDayOfMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { mapGetters, mapMutations, mapState } from 'vuex';

import store from '../store';

export default {
  data() {
    return {
      show: new Date(),
      startPageX: 0,
    };
  },

  store,

  computed: {
    ...mapState({
      photos: state => state.timeline.photos,
      selected: state => state.timeline.selected.date,
    }),
    ...mapGetters(['firstMonthInTimeline']),

    title() {
      return format(this.show, 'YYYY 年 M 月');
    },
    dayChunks() {
      const days = eachDay(this.startOfCalendar, this.endOfCalendar).map(
        day => ({
          date: day.getDate(),
          day: day,
          photo: this.photos.find(p => isSameDay(p.created_at, day)),
          isSelect: isSameDay(this.selected, day),
          isToday: isToday(day),
          isSameMonth: isSameMonth(day, this.show),
          isFuture: isFuture(day),
        }),
      );
      const res = [];
      for (let i = 0; i < days.length; i += 7) {
        res.push(days.slice(i, i + 7));
      }
      return res;
    },
    startOfCalendar() {
      return startOfWeek(startOfMonth(this.show));
    },
    endOfCalendar() {
      return endOfWeek(lastDayOfMonth(this.show));
    },
    reachTheStart() {
      return isSameMonth(this.show, this.firstMonthInTimeline);
    },
    reachTheEnd() {
      return isThisMonth(this.show);
    },
  },

  methods: {
    ...mapMutations(['setSelectedDate', 'setSelectedPhoto']),

    today() {
      this.setSelectedDate(new Date());
      this.$emit('close');
    },
    prior() {
      if (!this.reachTheStart) {
        this.show = subMonths(this.show, 1);
      }
    },
    next() {
      if (!this.reachTheEnd) {
        this.show = addMonths(this.show, 1);
      }
    },
    click(day) {
      if (day.photo) {
        this.setSelectedPhoto(day.photo);
      } else {
        this.setSelectedDate(day.day);
      }
      this.$emit('close');
    },
    touchStart(event) {
      this.startPageX = event.mp.changedTouches[0].pageX;
    },
    touchEnd(event) {
      const offsetX = this.startPageX - event.mp.changedTouches[0].pageX;
      if (offsetX > 150) {
        this.prior();
      } else if (offsetX < -150) {
        this.next();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../theme';

.calendar-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $primary-color;
  display: table;
  color: white;
}

.calendar-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.spacer {
  flex: 1 1 auto;
}

.top {
  padding: 0;
  margin: 0 auto;
  display: flex;
  width: 300px;
  align-items: center;

  > .title {
    font-size: 20px;
  }

  > .icon {
    width: 22.5px;
    height: 22.5px;
    margin: 0 10px;
  }

  > .arrow {
    border-right: 3px solid;
    border-bottom: 3px solid;
    margin: 0 10px;
    height: 10px;
    width: 10px;

    &.-right {
      transform: rotate(-45deg);
    }

    &.-left {
      transform: rotate(135deg);
    }

    &.-disable {
      color: rgba(white, 0.5);
    }
  }
}

.row {
  display: flex;
  justify-content: space-around;
  width: 300px;
  margin: 0 auto;
}

.day {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  color: white;
  line-height: 30px;
  text-align: center;
  margin-top: 5px;
  border: 2px solid transparent;

  &.-today {
    position: relative;

    &::before {
      transform: translateX(-50%);
      border-radius: 100%;
      position: absolute;
      background: white;
      bottom: 5px;
      height: 5px;
      width: 5px;
      content: '';
      left: 50%;
    }

    &.-select::before {
      background: $primary-color;
    }
  }

  &.-mark {
    border-color: white;
  }

  &.-select {
    color: $primary-color;
    background-color: white;
    width: 32px;
    height: 32px;
    line-height: 32px;
  }

  &.-other {
    color: $light-primary-color;

    &.-mark {
      border-color: $light-primary-color;
    }
  }

  &.-future {
    color: $light-primary-color;
  }
}

.week {
  @extend .day;
  font-size: 15px;
  color: lighten($primary-color, 40%);
}
</style>
