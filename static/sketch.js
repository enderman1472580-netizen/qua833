let music;
let isStarted = false;
let particles = [];
let shapeState = 0;
let timeStarted = 0;

const palettes = {
  galaxy: ["#00d4ff", "#0052d4", "#6a11cb", "#ffffff"],
  vortex: ["#8BE9FD", "#BD93F9", "#50fa7b", "#ff79c6"],
  romance: ["#FF79C6", "#CF6292", "#F8F8F2", "#BD93F9"],
  butterfly: ["#08f7fe", "#09d1f7", "#a770ef", "#ffacfc"],
  infinity: ["#fdfcfb", "#a1c4fd", "#2575fc", "#6272A4"],
  swan: ["#ffffff", "#fdfcfb", "#a1c4fd", "#8BE9FD"],
  fireworks: ["#FF79C6", "#BD93F9", "#F8F8F2", "#00d4ff", "#6a11cb"],
  stardust: ["#452C63", "#1B1B3A", "#fdfcfb", "#a1c4fd"],
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  music = loadSound("/static/thoikhong.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  const seal = document.getElementById("seal-btn");
  const wrapper = document.getElementById("welcome-wrapper");
  const envelope = document.getElementById("envelope");

  if (seal) {
    seal.onclick = (e) => {
      e.stopPropagation();
      if (envelope) envelope.classList.add("is-open");
    };
  }

  if (wrapper) {
    wrapper.onclick = () => {
      if (envelope && envelope.classList.contains("is-open")) startExperience();
    };
  }

  // --- XỬ LÝ NÚT TRẢI LÒNG ---
  const confessBtn = document.getElementById("confess-btn");
  const modal = document.getElementById("confess-modal");
  const nextBtn = document.getElementById("next-part-btn");
  const textArea = document.getElementById("confess-text-area");
  const title = document.getElementById("confess-title");

  if (confessBtn) {
    confessBtn.onclick = () => {
      modal.style.display = "flex";
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      const contentArea = document.getElementById("confess-text-area");
      const titleArea = document.getElementById("confess-title");
      if (nextBtn.innerText.includes("Kế tiếp")) {
        if (titleArea) titleArea.innerText = "Yups bắt đầu nhé";
        if (contentArea) {
          title.innerText = "Yups bắt đầu nhé";
          contentArea.innerHTML =
            "viết cái này cảm giác nhớ hồi đó em hay viết giấy cho anh á=))) <br> giải thích nhanh thì 3 ngày trước hôm mình dừng lại anh phải đi điều trị tích cực <br> vì sợ em lo nên anh cũng không dám nói kiểu muốn nhắn tin mà thuốc vô mệt quá nên không nhắn í chứ không phải anh hết yêu hay gì đâu <br> lúc mà anh đồng ý dừng lại cũng chẳng phải là do anh hết yêu  mà nói đúng ra thì do anh không muốn em lo lắng cho bệnh của anh thuii vì lúc anh phát hiện là anh ở giai đoạn 3 rùi <br> ai mà ngờ cái mình sợ là cái hại mình đâu@@ không dám thừa nhận hiện tại anh khỏe chung quy là anh cảm giác hiện tại khá tốt nè <br> anh nói thiệt chớ anh cũng thắc mắc lý do mình phải dừng lại lắm luôn chắc do anh không nói rõ nên mọi chuyện mới khó nói như bây giờ <br> nếu còn cơ hội anh chắc chắn sẽ sửa sai nhưng anh nghĩ bây giờ cũng khó rồi nhỉ <br> thiệt tình là không giỏi ăn nói nên nhắn có hơi vụng về xí <br> nhưng nói thật là hiện tại anh vẫn không mong kết thúc như hiện tại <br> sắp tới có thể anh đi du học vì anh sợ không còn cơ hội để nói ra hết nên anh mới quyết định nói tại đây <br> nhiều lần anh cũng muốn chủ động nhắn với em nhưng nhìn lại tin nhắn anh cảm nhận em cũng không muốn nhắn với anh nữa cũng như không muốn nói chuyện <br> dù biết hiện tại hy vọng em nhấp vào link là nhỏ nhoi nhưng vẫn cứ thử thui còn nếu không được nữa thì đành cất giấu vậy hổng biết làm gì khác cả<br> thui nói cũng dài rùi bây giờ anh chỉ biết chúc em may mắn trên con đường sắp tới thôi <br> lớp 12 rồi đó không được bỏ bữa nữa nha học hành ăn uống nghiêm túc vào <br> bị giống tui mà vô tình gặp trên bv là tui đấm mấy ng đó=))) <br> nếu có cơ hội gặp nhau hay nói chuyện với nhau anh mong là cả 2 đứa sẽ không còn khó xử nữa <br> nếu được tham lam hơn 1 chút cho mình thì anh vẫn muốn mình làm lại đi lại từ những thứ mình đã bỏ lở dở chừng <br> thuiii dài rùi tui đi ngủ đâyy nói tới đây thuii nếu còn cơ hội thì mình nói chuyện với nhau tiếp còn không thì mình sẽ chúc nhau hạnh phúc trên con đường mình chọn nhé cô gái:3";
          nextBtn.innerText = "Trân Trọng nháaa ❤️";
        } else {
          modal.style.display = "none";
        }
      }
    };
  }
}

function startExperience() {
  if (isStarted) return;
  isStarted = true;
  timeStarted = millis();
  if (music && !music.isPlaying()) {
    music.setVolume(0.4);
    music.play();
  }
  const wrapper = document.getElementById("welcome-wrapper");
  if (wrapper) {
    wrapper.style.opacity = "0";
    setTimeout(() => {
      wrapper.style.display = "none";
    }, 1000);
  }
}

// --- HÀM DRAW: CHỈ CHỨA LOGIC CHẠY VÀ TIMING ---
function draw() {
  background(0, 25);
  if (!isStarted) return;

  let elapsed = millis() - timeStarted;

  // --- HỆ THỐNG TIMING CHUẨN ---
  if (shapeState === 0 && elapsed > 17000) shapeState = 1;
  else if (shapeState === 1 && elapsed > 30000) shapeState = 1.5;
  else if (shapeState === 1.5 && elapsed > 44000) shapeState = 2;
  else if (shapeState === 2 && elapsed > 58000) shapeState = 2.5;
  else if (shapeState === 2.5 && elapsed > 76000) shapeState = 3;
  else if (shapeState === 3 && elapsed > 90000) shapeState = 4;
  else if (shapeState === 4 && elapsed > 105000) shapeState = 4.5;
  else if (shapeState === 4.5 && elapsed > 117000) shapeState = 5;
  else if (shapeState === 5 && elapsed > 133000) shapeState = 6;
  else if (shapeState === 6 && elapsed > 151000) shapeState = 7;
  else if (shapeState === 7 && elapsed > 170000) shapeState = 8;
  else if (shapeState === 8 && elapsed > 180000) shapeState = 9;
  else if (shapeState === 9 && elapsed > 185000) {
    shapeState = 10;
    showFinalWish(); // Gọi hàm hiện khung duy nhất 1 lần ở đây
  }

  if (particles.length < 1300) particles.push(new Particle());

  push();
  blendMode(ADD);
  for (let p of particles) {
    p.update(elapsed);
    p.show();
  }
  pop();
}

// --- CLASS PARTICLE: CHỈ CHỨA LOGIC CỦA HẠT ---
class Particle {
  constructor() {
    this.role = random() > 0.6 ? "background" : "shaper";
    this.x = random(width);
    this.y = random(height);
    this.t = random(TWO_PI);
    this.baseColor = this.getColorForState();
    this.size = random(2, 4);
    this.vx = random(-1.5, 1.5);
    this.vy = random(-1.5, 1.5);
    this.angle = random(TWO_PI);
  }

  getColorForState() {
    let p;
    if (shapeState <= 1) p = palettes.galaxy;
    else if (shapeState === 1.5) p = palettes.vortex;
    else if (shapeState === 2 || shapeState === 2.5) p = palettes.romance;
    else if (shapeState === 3) p = palettes.butterfly;
    else if (shapeState === 4 || shapeState === 4.5) p = palettes.infinity;
    else if (shapeState === 5) p = palettes.swan;
    else if (shapeState === 6) p = palettes.fireworks;
    else p = palettes.stardust;
    return color(random(p));
  }

  update(elapsed) {
    let sz = min(width, height);
    let tx = this.x;
    let ty = this.y;

    if (frameCount % 60 === 0) {
      let targetColor = this.getColorForState();
      this.baseColor = lerpColor(this.baseColor, targetColor, 0.2);
    }

    if (this.role === "background" && shapeState !== 0) {
      this.x += this.vx * 0.2;
      this.y += this.vy * 0.2;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
      return;
    }

    // Logic hình dạng
    if (shapeState === 0) {
      this.y -= 1.5;
      this.angle += 0.02;
      let r = map(this.y, height, 0, 20, width / 4);
      tx = width / 2 + cos(this.angle) * r;
      ty = this.y;
      if (this.y < -20) this.y = height + 20;
    } else if (shapeState === 1) {
      tx = width / 2 + (sz / 2.5) * exp(-0.5 * this.t) * cos(5 * this.t);
      ty = height / 2 + (sz / 2.5) * exp(-0.5 * this.t) * sin(5 * this.t);
    } else if (shapeState === 1.5) {
      let r = map(sin(this.t * 2), -1, 1, 40, sz / 2.2);
      tx = width / 2 + r * cos(this.t * 8);
      ty = height / 2 + r * sin(this.t * 8);
    } else if (shapeState === 2) {
      let side = particles.indexOf(this) % 2 === 0 ? 1 : -1;
      let heartPulse = 1 + 0.08 * sin(this.t * 3) + 0.04 * cos(this.t * 7);
      tx = width / 2 + side * (60 * heartPulse);
      ty = height / 2 + (sz / 6) * cos(this.t);
    } else if (shapeState === 2.5) {
      let side = particles.indexOf(this) % 2 === 0 ? 1 : -1;
      let dSpeed = frameCount * 0.025;
      let n = noise(this.t, dSpeed) * 15;
      tx = width / 2 + side * 50 + cos(dSpeed * side) * (60 + n);
      ty = height / 2 + sin(dSpeed * side) * (80 + n);
    } else if (shapeState === 3) {
      this.x += random(-5, 5);
      this.y += random(-5, 5);
      return;
    } else if (shapeState === 4) {
      let d = 1 + pow(sin(this.t), 2);
      tx = width / 2 + ((sz / 2.5) * cos(this.t)) / d;
      ty = height / 2 + ((sz / 2.5) * sin(this.t) * cos(this.t)) / d;
    } else if (shapeState === 4.5) {
      let r = exp(sin(this.t)) - 2 * cos(4 * this.t);
      tx = width / 2 + ((r * sz) / 10) * sin(this.t);
      ty = height / 2 - ((r * sz) / 10) * cos(this.t);
    } else if (shapeState === 5) {
      let side = particles.indexOf(this) % 2 === 0 ? 1 : -1;
      tx = width / 2 + side * (60 + 40 * cos(this.t));
      ty = height / 2 + 80 * sin(this.t) - 100;
    } else if (shapeState === 6) {
      this.y += 1.5;
      this.x += sin(this.t) * 0.5;
      if (this.y > height) this.y = 0;
      return;
    } else if (shapeState >= 7) {
      this.x += this.vx * 0.1;
      this.y += this.vy * 0.1;
      if (elapsed > 180000) this.size *= 0.99;
      return;
    }

    this.x = lerp(this.x, tx, 0.1);
    this.y = lerp(this.y, ty, 0.05);
    this.t += 0.02;
  }

  show() {
    noStroke();
    let c = color(this.baseColor);
    let alphaVal = shapeState >= 7 ? 50 : 150;
    if (shapeState === 2 || shapeState === 2.5) {
      alphaVal = 130 + 50 * sin(this.t * 10);
    }
    c.setAlpha(alphaVal);
    fill(c);
    let s = this.size;
    if (shapeState === 6) s *= 0.8;
    ellipse(this.x, this.y, s);
  }
}

// --- HÀM NÀY PHẢI NẰM RIÊNG Ở CUỐI CÙNG ---
function showFinalWish() {
  const finalBox = document.getElementById("final-wish");
  const openBtn = document.getElementById("confess-btn"); // Gọi cái nút ra

  if (finalBox) {
    finalBox.style.display = "block";
    let op = 0;
    let anim = setInterval(() => {
      op += 0.05;
      finalBox.style.opacity = op;
      if (op >= 1) {
        clearInterval(anim);
        // CHỈ KHI CHỮ HIỆN XONG, NÚT MỚI ĐƯỢC PHÉP XUẤT HIỆN
        if (openBtn) openBtn.style.display = "block";
      }
    }, 50);
  }
}
