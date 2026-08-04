# -*- coding: utf-8 -*-
"""Colab defterlerini üretir. Not defteri JSON'unu elle yazmak yerine
hücreleri burada tutmak, düzeltmeyi ve iki modeli aynı akışta tutmayı
kolaylaştırıyor."""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))


def md(*lines):
    return {"cell_type": "markdown", "metadata": {},
            "source": [l + "\n" for l in lines]}


def code(*lines):
    return {"cell_type": "code", "metadata": {}, "execution_count": None,
            "outputs": [], "source": [l + "\n" for l in lines]}


REPO = "https://github.com/adzetto/reading-library"

# --------------------------------------------------------------------- ortak
CELL_INTRO = lambda model, title: md(
    f"# {title}",
    "",
    "Okuma Kütüphanesi için stüdyo kalitesinde anlatım sesi üretir.",
    "",
    f"**Model:** `{model}`",
    "",
    "**Önce:** Çalışma zamanı → Çalışma zamanı türünü değiştir → **T4 GPU**",
    "",
    "Hücreleri sırayla çalıştırın. Son hücre `audio-<docid>.zip` indirir;",
    "onu sitedeki `assets/audio/<docid>/` klasörüne açın.",
)

CELL_GPU = code(
    "# 1 · GPU denetimi",
    "import subprocess, sys",
    "print(subprocess.run(['nvidia-smi','--query-gpu=name,memory.total',",
    "                      '--format=csv,noheader'],",
    "                     capture_output=True, text=True).stdout.strip() or",
    "      'GPU YOK — Çalışma zamanı türünü T4 GPU yapın')",
)

CELL_FETCH = code(
    "# 2 · Metinleri çek ve belgeyi seç",
    f"REPO = '{REPO}'",
    "import os, json, urllib.request",
    "",
    "if not os.path.exists('reading-library'):",
    "    !git clone -q --depth 1 $REPO reading-library",
    "",
    "NARR = 'reading-library/narration'",
    "index = json.load(open(f'{NARR}/INDEX.json', encoding='utf-8'))",
    "print(f\"{'belge':22s}{'parça':>7s}{'karakter':>10s}{'~dakika':>9s}\")",
    "print('-'*50)",
    "for r in index:",
    "    print(f\"{r['id']:22s}{r['items']:7d}{r['chars']:10d}{r['minutes_est']:9d}\")",
    "",
    "#@markdown ---",
    "DOC_ID = 'net-feasibility'  #@param {type:'string'}",
    "#@markdown Uzun belgeleri bölmek için parça aralığı (0,0 = tümü)",
    "PARCA_BAS = 0  #@param {type:'integer'}",
    "PARCA_SON = 0  #@param {type:'integer'}",
    "",
    "doc = json.load(open(f'{NARR}/{DOC_ID}.json', encoding='utf-8'))",
    "items = doc['items']",
    "if PARCA_SON: items = items[PARCA_BAS:PARCA_SON]",
    "elif PARCA_BAS: items = items[PARCA_BAS:]",
    "print(f\"\\n{doc['title'][:70]}\")",
    "print(f'{len(items)} parça seçildi · ton önerisi: {doc[\"voice_hint\"]}')",
    "print('\\nörnek:', items[0]['text'][:160])",
)

CELL_OUTDIR = code(
    "# 4 · Çıktı klasörü (Drive bağlarsanız oturum kopsa da kaybolmaz)",
    "USE_DRIVE = False  #@param {type:'boolean'}",
    "import os",
    "if USE_DRIVE:",
    "    from google.colab import drive",
    "    drive.mount('/content/drive')",
    "    OUT = f'/content/drive/MyDrive/reading-library-audio/{DOC_ID}'",
    "else:",
    "    OUT = f'/content/out/{DOC_ID}'",
    "os.makedirs(OUT, exist_ok=True)",
    "done = {f.rsplit('.',1)[0] for f in os.listdir(OUT) if f.endswith('.wav')}",
    "print(f'çıktı: {OUT}')",
    "print(f'zaten üretilmiş: {len(done)} parça')",
)

CELL_PACK = code(
    "# 7 · WAV → OPUS, manifest ve zip",
    "#@markdown Opus çok daha küçük; ses kalitesi konuşma için yeterli.",
    "TO_OPUS = True   #@param {type:'boolean'}",
    "BITRATE = '48k'  #@param {type:'string'}",
    "",
    "import os, json, glob, subprocess, wave, contextlib",
    "!apt-get -qq install -y ffmpeg > /dev/null 2>&1",
    "",
    "fmt = 'opus' if TO_OPUS else 'wav'",
    "pack = f'/content/pack/{DOC_ID}'",
    "os.makedirs(pack, exist_ok=True)",
    "",
    "entries, total = [], 0",
    "for it in doc['items']:",
    "    src = f\"{OUT}/{it['id']}.wav\"",
    "    if not os.path.exists(src):",
    "        continue",
    "    with contextlib.closing(wave.open(src)) as w:",
    "        dur = round(w.getnframes() / float(w.getframerate()), 2)",
    "    dst = f\"{pack}/{it['id']}.{fmt}\"",
    "    if TO_OPUS:",
    "        subprocess.run(['ffmpeg','-y','-loglevel','error','-i',src,",
    "                        '-c:a','libopus','-b:a',BITRATE,'-ac','1',dst],",
    "                       check=True)",
    "    else:",
    "        subprocess.run(['cp',src,dst], check=True)",
    "    entries.append({'id': it['id'], 'node': it['node'],",
    "                    'part': it['part'], 'dur': dur})",
    "    total += dur",
    "",
    "manifest = {'id': DOC_ID, 'voice': VOICE_LABEL, 'model': MODEL_ID,",
    "            'format': fmt, 'sr': SR, 'items': entries}",
    "with open(f'{pack}/manifest.js', 'w', encoding='utf-8') as f:",
    "    f.write('window.AUDIO = window.AUDIO || {};\\n')",
    "    f.write(f'window.AUDIO[\"{DOC_ID}\"] = ')",
    "    json.dump(manifest, f, ensure_ascii=False)",
    "    f.write(';\\n')",
    "",
    "mb = sum(os.path.getsize(p) for p in glob.glob(f'{pack}/*')) / 1048576",
    "print(f'{len(entries)} parça · {total/60:.1f} dakika ses · {mb:.1f} MB')",
    "",
    "!cd /content/pack && zip -qr audio-$DOC_ID.zip $DOC_ID",
    "from google.colab import files",
    "files.download(f'/content/pack/audio-{DOC_ID}.zip')",
)

CELL_INSTALL_NOTE = md(
    "## Siteye koyma",
    "",
    "```",
    "1. audio-<docid>.zip dosyasını açın",
    "2. çıkan <docid>/ klasörünü  assets/audio/  altına koyun",
    "3. assets/audio/index.js içine id'yi ekleyin:",
    "     window.AUDIO_INDEX = ['net-feasibility'];",
    "```",
    "",
    "Site açıldığında seslendirme panelinde **Stüdyo ses** rozeti görünür.",
)


# ----------------------------------------------------- Higgs-Audio v2 defteri
def higgs():
    cells = [
        CELL_INTRO("bosonai/higgs-audio-v2-generation-3B-base",
                   "Higgs-Audio v2 (3B) ile anlatım üretimi"),
        CELL_GPU,
        CELL_FETCH,
        md("## Model",
           "",
           "İlk çalıştırmada ~7 GB indirir. Ses klonlamak isterseniz 10-20 saniyelik",
           "temiz bir `ref.wav` yükleyin ve `REF_AUDIO` yolunu verin."),
        code(
            "# 3 · Higgs-Audio v2 kurulumu",
            "!pip -q install --upgrade 'transformers>=4.45' accelerate torchaudio soundfile",
            "!pip -q install git+https://github.com/boson-ai/higgs-audio.git",
            "",
            "import torch, os",
            "MODEL_ID = 'bosonai/higgs-audio-v2-generation-3B-base'",
            "TOKENIZER_ID = 'bosonai/higgs-audio-v2-tokenizer'",
            "DEV = 'cuda' if torch.cuda.is_available() else 'cpu'",
            "SR = 24000",
            "",
            "from boson_multimodal.serve.serve_engine import HiggsAudioServeEngine",
            "engine = HiggsAudioServeEngine(MODEL_ID, TOKENIZER_ID, device=DEV)",
            "print('model hazır ·', DEV)",
        ),
        CELL_OUTDIR,
        md("## Ses",
           "",
           "`REF_AUDIO` boşsa model kendi doğal anlatım sesini üretir.",
           "Klonlama için sağ paneldeki dosya yükleme ile `ref.wav` koyun."),
        code(
            "# 5 · Ses ve üslup",
            "REF_AUDIO = ''  #@param {type:'string'}",
            "VOICE_LABEL = 'higgs-v2 · doğal anlatım'  #@param {type:'string'}",
            "TEMPERATURE = 0.3  #@param {type:'number'}",
            "",
            "SYSTEM = (",
            "    'Generate audio following instruction.\\n\\n'",
            "    '<|scene_desc_start|>\\n'",
            "    'Audio is recorded in a quiet studio. A single narrator reads an '",
            "    'academic text aloud: calm, clear, unhurried, neutral accent. '",
            "    'No music, no background noise.\\n'",
            "    '<|scene_desc_end|>'",
            ")",
            "if 'story' in doc['voice_hint']:",
            "    SYSTEM = SYSTEM.replace('an academic text aloud: calm, clear, unhurried, neutral accent',",
            "                            'a story aloud: warm, expressive, gently paced')",
            "print(SYSTEM)",
        ),
        code(
            "# 6 · Üretim  (kesilirse aynı hücreyi yeniden çalıştırın, kaldığı yerden devam eder)",
            "import time, soundfile as sf, numpy as np",
            "from boson_multimodal.data_types import ChatMLSample, Message, AudioContent",
            "",
            "def build_messages(text):",
            "    msgs = [Message(role='system', content=SYSTEM)]",
            "    if REF_AUDIO:",
            "        msgs.append(Message(role='user', content='Reference voice.'))",
            "        msgs.append(Message(role='assistant',",
            "                            content=AudioContent(audio_url=REF_AUDIO)))",
            "    msgs.append(Message(role='user', content=text))",
            "    return ChatMLSample(messages=msgs)",
            "",
            "todo = [i for i in items if i['id'] not in done]",
            "print(f'{len(todo)} parça üretilecek ({len(items)-len(todo)} zaten var)')",
            "t0 = time.time()",
            "for n, it in enumerate(todo, 1):",
            "    out = engine.generate(chat_ml_sample=build_messages(it['text']),",
            "                          max_new_tokens=2048,",
            "                          temperature=TEMPERATURE,",
            "                          top_p=0.95, top_k=50)",
            "    sf.write(f\"{OUT}/{it['id']}.wav\", out.audio, out.sampling_rate)",
            "    if n % 5 == 0 or n == len(todo):",
            "        hz = n / (time.time() - t0)",
            "        kalan = (len(todo) - n) / max(hz, 1e-6) / 60",
            "        print(f'{n}/{len(todo)} · {hz*60:.1f} parça/dk · ~{kalan:.0f} dk kaldı')",
            "print('bitti')",
        ),
        CELL_PACK,
        CELL_INSTALL_NOTE,
    ]
    return nb(cells)


# --------------------------------------------------- Step-Audio-EditX defteri
def stepaudio():
    cells = [
        CELL_INTRO("stepfun-ai/Step-Audio-EditX",
                   "Step-Audio-EditX ile anlatım üretimi"),
        CELL_GPU,
        CELL_FETCH,
        md("## Model",
           "",
           "Step-Audio-EditX üslup ve duygu düzenlemede güçlüdür. Klonlama için",
           "10-20 saniyelik `ref.wav` ve o kaydın metnini vermek gerekir."),
        code(
            "# 3 · Step-Audio-EditX kurulumu",
            "!pip -q install --upgrade transformers accelerate torchaudio soundfile hyperpyyaml",
            "!git clone -q https://github.com/stepfun-ai/Step-Audio-EditX.git",
            "%cd Step-Audio-EditX",
            "!pip -q install -r requirements.txt",
            "%cd /content",
            "",
            "from huggingface_hub import snapshot_download",
            "MODEL_ID = 'stepfun-ai/Step-Audio-EditX'",
            "LOCAL = snapshot_download(MODEL_ID)",
            "SR = 24000",
            "",
            "import sys; sys.path.insert(0, '/content/Step-Audio-EditX')",
            "from stepaudio import StepAudio",
            "engine = StepAudio(LOCAL)",
            "print('model hazır')",
        ),
        CELL_OUTDIR,
        code(
            "# 5 · Ses ve üslup",
            "REF_AUDIO = ''  #@param {type:'string'}",
            "REF_TEXT  = ''  #@param {type:'string'}",
            "VOICE_LABEL = 'step-audio-editx · doğal anlatım'  #@param {type:'string'}",
            "EMOTION = 'calm'  #@param ['calm','neutral','warm','serious','happy']",
            "print('ton:', EMOTION, '| klon:', bool(REF_AUDIO))",
        ),
        code(
            "# 6 · Üretim",
            "import time, soundfile as sf",
            "todo = [i for i in items if i['id'] not in done]",
            "print(f'{len(todo)} parça üretilecek')",
            "t0 = time.time()",
            "for n, it in enumerate(todo, 1):",
            "    if REF_AUDIO:",
            "        wav, sr = engine.clone(text=it['text'], prompt_wav=REF_AUDIO,",
            "                               prompt_text=REF_TEXT, emotion=EMOTION)",
            "    else:",
            "        wav, sr = engine.tts(text=it['text'], emotion=EMOTION)",
            "    sf.write(f\"{OUT}/{it['id']}.wav\", wav, sr)",
            "    if n % 5 == 0 or n == len(todo):",
            "        hz = n / (time.time() - t0)",
            "        print(f'{n}/{len(todo)} · ~{(len(todo)-n)/max(hz,1e-6)/60:.0f} dk kaldı')",
            "print('bitti')",
        ),
        CELL_PACK,
        CELL_INSTALL_NOTE,
    ]
    return nb(cells)


def nb(cells):
    return {
        "nbformat": 4, "nbformat_minor": 0,
        "metadata": {
            "colab": {"provenance": [], "gpuType": "T4", "toc_visible": True},
            "kernelspec": {"name": "python3", "display_name": "Python 3"},
            "language_info": {"name": "python"},
            "accelerator": "GPU",
        },
        "cells": cells,
    }


for name, build in [("higgs_audio_v2", higgs), ("step_audio_editx", stepaudio)]:
    p = os.path.join(HERE, name + ".ipynb")
    json.dump(build(), open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{name}.ipynb  {len(build()['cells'])} hücre  "
          f"{os.path.getsize(p)//1024} KB")
