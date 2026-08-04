/* ==================================================================
   motion.entry.mjs — motion.dev'in yalnızca kullandığımız DOM API'leri

   Bu dosya tarayıcıya GİTMEZ; yalnızca derleme girdisidir. Sözleşme §0
   gereği tarayıcıya klasik <script> ile giden dosya motion.min.js'tir
   (IIFE, window.Motion). Paketin kökü saf DOM API'sidir — React
   yalnızca "motion/react" altındadır, yani bu pakete sızmaz.

   Yeniden derlemek için:
       npm run build:motion

   Paketin tamamı 136 KB; aşağıdaki dokuz ad 66 KB'a iniyor. Yeni bir
   API gerekirse buraya ekleyip komutu yeniden çalıştırın.
   ================================================================== */
export {
  animate,     // WAAPI tabanlı animasyon
  inView,      // görünür olunca tetikle
  hover,       // işaretçi üstüne gelme (dokunmatikte tetiklenmez)
  press,       // basma
  spring,      // yay fiziği — imleç takibi
  stagger,     // sıralı gecikme
  transform,   // aralık eşleme
  frame,       // ortak rAF kuyruğu
  delay
} from "motion";
