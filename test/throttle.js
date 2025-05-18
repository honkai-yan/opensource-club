export function throttle(fn, delay) {
  let last = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();
    if (now - last < delay) {
      if (timer) return;
      timer = setTimeout(() => {
        last = now;
        timer = null;
        fn.apply(this, args);
      }, delay);
    } else {
      last = now;
    }
  };
}

function task() {
  setTimeout(() => {
    console.log("执行任务：你好，世界！");
  }, 1000);
}

const throttledTask = throttle(task, 3000);

let count = 0;

const t = setInterval(() => {
  count++;
  console.info(`调用${count}次`);
  if (count >= 15) {
    console.info("停止调用");
    clearInterval(t);
    return;
  }

  throttledTask();
}, 200);
