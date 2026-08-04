# -*- coding: utf-8 -*-
"""Makalelerin üstverisi ve sınav soruları.

Sorular metnin ANLAŞILMASINI ölçer; her soru ve şık iki dildedir, çünkü
okur İngilizce bilmiyor. `ref` alanı metindeki dayanak bölümün id'sidir.
"""

META = {

# =====================================================================
"jadr-2022": dict(
    kind="article",
    title_en="A Systematic Review of Prevalence and Correlates of Post-Traumatic "
             "Stress Disorder, Depression and Anxiety in Displaced Syrian Population",
    title_tr="Yerinden Edilmiş Suriyeli Nüfusta Travma Sonrası Stres Bozukluğu, "
             "Depresyon ve Anksiyetenin Yaygınlığı ve İlişkili Etkenleri: "
             "Sistematik Bir Derleme",
    authors=["Fatma Aysazci-Cakar", "Thomas Schroder", "Nigel Hunt"],
    source="Journal of Affective Disorders Reports 10 (2022) 100397",
    year=2022, level="C1",
    blurb_tr="On yedi çalışmayı bir araya getirip Suriyeli mültecilerde TSSB, "
             "depresyon ve anksiyetenin ne sıklıkta görüldüğünü ölçer. Sonuç: "
             "oranlar genel nüfusun dört ila yedi katı.",
    emoji="🧠", hue=210,
    quiz=[
        dict(type="mc",
             q=dict(en="How many studies met the full eligibility criteria?",
                    tr="Kaç çalışma tüm uygunluk ölçütlerini karşıladı?"),
             opts=[dict(en="17 studies", tr="17 çalışma"),
                   dict(en="21 studies", tr="21 çalışma"),
                   dict(en="34 studies", tr="34 çalışma"),
                   dict(en="269 studies", tr="269 çalışma")],
             a=0,
             why=dict(tr="Tam metin değerlendirmesine 21 çalışma girdi, ancak "
                         "kalite değerlendirmesinden sonra 4'ü elendi ve geriye "
                         "17 çalışma kaldı."),
             ref="sec-3"),
        dict(type="mc",
             q=dict(en="What was the total number of Syrian participants?",
                    tr="Toplam Suriyeli katılımcı sayısı kaçtı?"),
             opts=[dict(en="9,061", tr="9.061"), dict(en="4,492", tr="4.492"),
                   dict(en="5,234", tr="5.234"), dict(en="1,678", tr="1.678")],
             a=0,
             why=dict(tr="On yedi çalışmanın toplamı 9.061 katılımcıdır; "
                         "%50,1'i kadın, %49,9'u erkektir."),
             ref="sec-3"),
        dict(type="tf",
             q=dict(en="Educational level was found to be a significant predictor "
                      "of PTSD, depression and anxiety.",
                    tr="Eğitim düzeyinin TSSB, depresyon ve anksiyete için anlamlı "
                       "bir yordayıcı olduğu bulunmuştur."),
             opts=[dict(en="True", tr="Doğru"), dict(en="False", tr="Yanlış")],
             a=1,
             why=dict(tr="On dört çalışmanın HİÇBİRİ eğitim düzeyi ile ruh sağlığı "
                         "sorunları arasında anlamlı bir ilişki bulamadı."),
             ref="sec-3-3"),
        dict(type="mc",
             q=dict(en="Which variable was consistently associated with higher "
                      "symptoms in every study that assessed it?",
                    tr="Kendisini inceleyen her çalışmada tutarlı biçimde daha "
                       "yüksek belirtilerle ilişkili bulunan değişken hangisi?"),
             opts=[dict(en="Number of traumatic events experienced",
                        tr="Yaşanan travmatik olay sayısı"),
                   dict(en="Marital status", tr="Medeni durum"),
                   dict(en="Settlement type (camp / out of camp)",
                        tr="Yerleşim biçimi (kamp içi / dışı)"),
                   dict(en="Length of the resettlement period",
                        tr="Yeniden yerleşim süresinin uzunluğu")],
             a=0,
             why=dict(tr="TSSB, depresyon ve anksiyete ile travmatik olay sayısı "
                         "arasındaki ilişkiyi inceleyen tüm çalışmalar aynı yönde "
                         "sonuç verdi: olay sayısı arttıkça belirtiler artıyor."),
             ref="sec-3-5"),
        dict(type="mc",
             q=dict(en="In which country was the highest PTSD prevalence (83.4 %) found?",
                    tr="En yüksek TSSB yaygınlığı (%83,4) hangi ülkede bulundu?"),
             opts=[dict(en="Turkey", tr="Türkiye"), dict(en="Germany", tr="Almanya"),
                   dict(en="Sweden", tr="İsveç"), dict(en="Greece", tr="Yunanistan")],
             a=0,
             why=dict(tr="Acarturk ve arkadaşlarının (2018) Türkiye'de bir kampta "
                         "yaptığı çalışma %83,4 ile en yüksek değeri bildirdi. "
                         "En düşük değer Almanya'da (%11,4) görüldü."),
             ref="sec-3-6"),
        dict(type="gap",
             q=dict(en="The mental health problems of this population are ___ times "
                      "higher than the general population.",
                    tr="Bu nüfusun ruh sağlığı sorunları genel nüfustan ___ kat "
                       "daha yüksektir."),
             opts=[dict(en="7–8", tr="7–8"), dict(en="2–3", tr="2–3"),
                   dict(en="20–25", tr="20–25"), dict(en="1–2", tr="1–2")],
             a=0,
             why=dict(tr="Özette bildirilen oran budur. Ortalamalara göre "
                         "hesaplanırsa dört ila altı kat, güven aralığının üst "
                         "ucuna göre yedi kat çıkar."),
             ref="ch-abstract"),
        dict(type="mc",
             q=dict(en="Why could the relationship between legal status and mental "
                      "health NOT be analysed?",
                    tr="Yasal statü ile ruh sağlığı arasındaki ilişki neden "
                       "çözümlenemedi?"),
             opts=[dict(en="Nearly all studies lacked detailed information about "
                           "the refugees' legal status",
                        tr="Çalışmaların neredeyse tamamı mültecilerin yasal "
                           "statüsüne dair ayrıntı vermiyordu"),
                   dict(en="Legal status is not related to mental health",
                        tr="Yasal statünün ruh sağlığıyla ilgisi yoktur"),
                   dict(en="The authors ran out of time",
                        tr="Yazarların zamanı yetmedi"),
                   dict(en="Only one country was studied",
                        tr="Yalnızca bir ülke incelendi")],
             a=0,
             why=dict(tr="Yalnızca üç çalışma bu bilgiyi verdi. Bu, incelenen "
                         "alanyazının bir kalite sorunudur."),
             ref="sec-3-7"),
        dict(type="match",
             q=dict(en="Match each English term with its Turkish meaning.",
                    tr="Her İngilizce terimi Türkçe karşılığıyla eşleştirin."),
             pairs=[("prevalence", "yaygınlık"), ("displaced", "yerinden edilmiş"),
                    ("correlate", "ilişkili değişken"), ("resettlement", "yeniden yerleşim"),
                    ("bias", "yanlılık")],
             a=0,
             why=dict(tr="Bu beş terim makalenin başlığında ve yöntem bölümünde "
                         "sürekli geçer.")),
    ]),

# =====================================================================
"net-feasibility": dict(
    kind="article",
    title_en="Practical Feasibility of Narrative Exposure Therapy in Syrian Refugee "
             "Population Residing in Turkiye: A Focus Group Study",
    title_tr="Türkiye'de Yaşayan Suriyeli Mülteci Nüfusunda Anlatısal Maruz Bırakma "
             "Terapisinin Uygulanabilirliği: Bir Odak Grup Çalışması",
    authors=["Fatma Aysazci-Cakar", "Thomas Schroder", "Nigel Hunt"],
    source="International Journal of Social Sciences 7(32), 2023, 1–25",
    year=2023, level="C1",
    blurb_tr="Suriyelilerle çalışan beş uzmanla yapılan odak grup görüşmesi, "
             "anlatısal maruz bırakma terapisinin Türkiye'de uygulanmasının "
             "önündeki engelleri araştırır.",
    emoji="🗣️", hue=160,
    quiz=[
        dict(type="mc",
             q=dict(en="How many participants took part in the focus group?",
                    tr="Odak grup görüşmesine kaç kişi katıldı?"),
             opts=[dict(en="Five", tr="Beş"), dict(en="Six", tr="Altı"),
                   dict(en="Three", tr="Üç"), dict(en="Ten", tr="On")],
             a=0,
             why=dict(tr="Altı kişi davet edildi ama biri son anda çekildi; "
                         "görüşme beş katılımcıyla yapıldı.")),
        dict(type="mc",
             q=dict(en="What is the abbreviation NET short for?",
                    tr="NET kısaltması neyin karşılığıdır?"),
             opts=[dict(en="Narrative Exposure Therapy",
                        tr="Anlatısal Maruz Bırakma Terapisi"),
                   dict(en="New Emotional Treatment", tr="Yeni Duygusal Tedavi"),
                   dict(en="Neural Exposure Training", tr="Nöral Maruziyet Eğitimi"),
                   dict(en="National Emergency Therapy", tr="Ulusal Acil Terapi")],
             a=0,
             why=dict(tr="NET, Schauer ve arkadaşlarının travma odaklı, kısa süreli "
                         "terapi yöntemidir.")),
        dict(type="tf",
             q=dict(en="Before this study, NET had already been widely practised "
                      "with Syrian refugees in Turkiye.",
                    tr="Bu çalışmadan önce NET, Türkiye'deki Suriyeli mültecilerle "
                       "yaygın biçimde uygulanmıştı."),
             opts=[dict(en="True", tr="Doğru"), dict(en="False", tr="Yanlış")],
             a=1,
             why=dict(tr="Makale açıkça belirtir: NET bugüne dek Türkiye'de ya da "
                         "Suriyeli mültecilerle uygulanmamış ve incelenmemiştir. "
                         "Çalışmanın gerekçesi budur.")),
        dict(type="mc",
             q=dict(en="Which age range was set as an eligibility criterion for the "
                      "subsequent study?",
                    tr="Sonraki çalışma için hangi yaş aralığı uygunluk ölçütü "
                       "olarak belirlendi?"),
             opts=[dict(en="20–45", tr="20–45"), dict(en="18–65", tr="18–65"),
                   dict(en="30–50", tr="30–50"), dict(en="15–40", tr="15–40")],
             a=0,
             why=dict(tr="Özette sıralanan ölçütler: 20-45 yaş arası olmak, "
                         "Türkçe bilmek ve okuryazar olmak, ekonomik rahatlık, "
                         "Türkiye'nin batısında ikamet etmek.")),
        dict(type="mc",
             q=dict(en="Roughly how many Syrian refugees have sought safety in "
                      "Turkiye, according to the abstract?",
                    tr="Özete göre yaklaşık kaç Suriyeli mülteci Türkiye'ye "
                       "sığınmıştır?"),
             opts=[dict(en="3.6 million", tr="3,6 milyon"),
                   dict(en="5.4 million", tr="5,4 milyon"),
                   dict(en="12 million", tr="12 milyon"),
                   dict(en="600,000", tr="600 bin")],
             a=0,
             why=dict(tr="Dışarıya yerinden edilen 5,4 milyon Suriyelinin 3,6 "
                         "milyonu Türkiye'ye sığınmıştır.")),
        dict(type="mc",
             q=dict(en="What research method was used to analyse the focus group data?",
                    tr="Odak grup verisi hangi yöntemle çözümlendi?"),
             opts=[dict(en="Content analysis", tr="İçerik analizi"),
                   dict(en="Randomised controlled trial",
                        tr="Randomize kontrollü deney"),
                   dict(en="Meta-analysis", tr="Meta-analiz"),
                   dict(en="Systematic review", tr="Sistematik derleme")],
             a=0,
             why=dict(tr="Nitel veriyi kodlara ve kategorilere ayıran içerik "
                         "analizi kullanıldı.")),
        dict(type="gap",
             q=dict(en="NET is described as a ___ universal approach, because "
                      "narrative is part of every culture.",
                    tr="NET, anlatı her kültürün parçası olduğu için ___ evrensel "
                       "bir yaklaşım olarak tanımlanır."),
             opts=[dict(en="culturally", tr="kültürel olarak"),
                   dict(en="medically", tr="tıbbi olarak"),
                   dict(en="politically", tr="siyasi olarak"),
                   dict(en="economically", tr="ekonomik olarak")],
             a=0,
             why=dict(tr="Schauer ve arkadaşları NET'i 'kültürel olarak evrensel' "
                         "sayar; çünkü anlatı, her kültürün ayrılmaz parçasıdır.")),
        dict(type="match",
             q=dict(en="Match each English term with its Turkish meaning.",
                    tr="Her İngilizce terimi Türkçe karşılığıyla eşleştirin."),
             pairs=[("feasibility", "uygulanabilirlik"), ("obstacle", "engel"),
                    ("recruitment", "katılımcı bulma"), ("stigma", "damgalanma"),
                    ("consent", "onam")],
             a=0,
             why=dict(tr="Bu terimler araştırma yöntemi bölümünün anahtar "
                         "sözcükleridir.")),
    ]),

# =====================================================================
"doc-b89f": dict(
    kind="article",
    title_en="An Autoethnographic Study of Experiencing Secondary Trauma While "
             "Working With War-Affected Children",
    title_tr="Savaştan Etkilenmiş Çocuklarla Çalışırken İkincil Travma Yaşamaya "
             "Dair Otoetnografik Bir Çalışma",
    authors=["Fatma Aysazcı Çakar"],
    source="Akademik Sosyal Araştırmalar Dergisi 12(153), 2024, 135–154",
    year=2024, level="B2",
    blurb_tr="Araştırmacının, savaştan etkilenmiş Suriyeli çocuklarla çalışırken "
             "kendi yaşadığı ikincil travmayı kendi notlarından yola çıkarak "
             "incelediği nitel bir çalışma.",
    emoji="📓", hue=25,
    quiz=[
        dict(type="mc",
             q=dict(en="What research method does this study use?",
                    tr="Bu çalışma hangi araştırma yöntemini kullanır?"),
             opts=[dict(en="Autoethnography", tr="Otoetnografi"),
                   dict(en="Randomised experiment", tr="Randomize deney"),
                   dict(en="Survey of 500 people", tr="500 kişilik anket"),
                   dict(en="Meta-analysis", tr="Meta-analiz")],
             a=0,
             why=dict(tr="Otoetnografi, araştırmacının kendi yaşantısını "
                         "kültürel bağlamı içinde çözümlediği nitel yöntemdir.")),
        dict(type="mc",
             q=dict(en="What is 'secondary trauma'?",
                    tr="'İkincil travma' nedir?"),
             opts=[dict(en="Distress that arises from hearing about another "
                           "person's traumatic experience",
                        tr="Bir başkasının travmatik yaşantısını dinlemekten "
                           "doğan ruhsal sıkıntı"),
                   dict(en="A second injury to the same person",
                        tr="Aynı kişinin ikinci kez yaralanması"),
                   dict(en="Trauma that happens in childhood",
                        tr="Çocuklukta yaşanan travma"),
                   dict(en="A milder form of PTSD",
                        tr="TSSB'nin hafif biçimi")],
             a=0,
             why=dict(tr="İkincil travma, travma mağdurlarıyla çalışan kişilerin "
                         "onların anlatılarına maruz kalarak geliştirdiği "
                         "belirtilerdir.")),
        dict(type="mc",
             q=dict(en="Whose life stories were included and analysed in the study?",
                    tr="Çalışmaya kimlerin yaşam öyküleri dahil edilip çözümlendi?"),
             opts=[dict(en="Two Syrian children affected by war",
                        tr="Savaştan etkilenmiş iki Suriyeli çocuk"),
                   dict(en="Ten Turkish social workers",
                        tr="On Türk sosyal hizmet uzmanı"),
                   dict(en="The researcher's family",
                        tr="Araştırmacının ailesi"),
                   dict(en="Five refugee mothers", tr="Beş mülteci anne")],
             a=0,
             why=dict(tr="Araştırmacının danışmanlık yaptığı iki çocuğun yaşam "
                         "öyküleri, ikincil travmanın mesleki boyutunu göstermek "
                         "için eklendi.")),
        dict(type="mc",
             q=dict(en="What was the main source of data?",
                    tr="Verinin temel kaynağı neydi?"),
             opts=[dict(en="The researcher's personal notes",
                        tr="Araştırmacının kişisel notları"),
                   dict(en="Hospital records", tr="Hastane kayıtları"),
                   dict(en="A national database", tr="Ulusal veri tabanı"),
                   dict(en="Newspaper archives", tr="Gazete arşivleri")],
             a=0,
             why=dict(tr="Veri, ikincil travma yaşantılarını yansıtan kişisel "
                         "notlardan derlendi.")),
        dict(type="tf",
             q=dict(en="The study was carried out in a social service setting in Turkiye.",
                    tr="Çalışma Türkiye'de bir sosyal hizmet ortamında yürütüldü."),
             opts=[dict(en="True", tr="Doğru"), dict(en="False", tr="Yanlış")],
             a=0,
             why=dict(tr="Özet, çalışmanın Türkiye'deki bir sosyal hizmet "
                         "ortamındaki deneyimlere dayandığını belirtir.")),
        dict(type="gap",
             q=dict(en="This qualitative research was rooted in the researcher's "
                      "personal and ___ life experiences.",
                    tr="Bu nitel araştırma, araştırmacının kişisel ve ___ yaşam "
                       "deneyimlerine dayanmaktadır."),
             opts=[dict(en="professional", tr="mesleki"),
                   dict(en="political", tr="siyasi"),
                   dict(en="financial", tr="mali"),
                   dict(en="academic", tr="akademik")],
             a=0,
             why=dict(tr="Özetteki ifade 'personal and professional life "
                         "experiences' — kişisel ve mesleki yaşam deneyimleri.")),
        dict(type="mc",
             q=dict(en="Which word best describes a 'counselor'?",
                    tr="'Counselor' sözcüğünü en iyi hangisi karşılar?"),
             opts=[dict(en="Someone who gives psychological guidance",
                        tr="Psikolojik danışmanlık veren kişi"),
                   dict(en="A lawyer in a courtroom", tr="Mahkemedeki avukat"),
                   dict(en="A school principal", tr="Okul müdürü"),
                   dict(en="A medical surgeon", tr="Cerrah")],
             a=0,
             why=dict(tr="Bu bağlamda 'counselor' psikolojik danışmandır; "
                         "araştırmacı çocuklarla bu rolde çalışmıştır.")),
        dict(type="match",
             q=dict(en="Match each English term with its Turkish meaning.",
                    tr="Her İngilizce terimi Türkçe karşılığıyla eşleştirin."),
             pairs=[("secondary trauma", "ikincil travma"),
                    ("war-affected", "savaştan etkilenmiş"),
                    ("qualitative", "nitel"), ("insight", "içgörü"),
                    ("setting", "ortam")],
             a=0,
             why=dict(tr="Bu terimler makalenin özetinde geçer.")),
    ]),

# =====================================================================
"doc-net-tr": dict(
    kind="article",
    title_en="A New and Holistic Approach to the Treatment of Post-Traumatic Stress "
             "Disorder: Narrative Exposure Therapy",
    title_tr="Travma Sonrası Stres Bozukluğunun Tedavisinde Yeni ve Bütüncül bir "
             "Yaklaşım: Anlatısal Maruz Bırakma Terapisi",
    authors=["Fatma Aysazcı Çakar"],
    source="Turkish Studies 21(2), 2026, 2357–2400",
    year=2026, level="C1",
    blurb_tr="Anlatısal maruz bırakma terapisinin kuramsal temellerini, oturum "
             "oturum işleyişini ve etkililiğine dair kanıtları anlatır. İngilizce "
             "ve Türkçe tam metni bir arada içerir.",
    emoji="🕰️", hue=280,
    quiz=[
        dict(type="mc",
             q=dict(en="What does NET aim to do with a person's life story?",
                    tr="NET, kişinin yaşam öyküsüyle ne yapmayı amaçlar?"),
             opts=[dict(en="Structure it chronologically, from birth to the present",
                        tr="Doğumdan bugüne, kronolojik olarak yapılandırmak"),
                   dict(en="Erase the painful memories",
                        tr="Acı veren anıları silmek"),
                   dict(en="Replace it with a positive story",
                        tr="Olumlu bir öyküyle değiştirmek"),
                   dict(en="Keep it secret from the therapist",
                        tr="Terapistten gizli tutmak")],
             a=0,
             why=dict(tr="NET, yaşam anlatısını kronolojik olarak yapılandırarak "
                         "kişinin travmatik olayları güvenli bir ortamda "
                         "işlemesini amaçlar.")),
        dict(type="mc",
             q=dict(en="Which techniques does NET integrate?",
                    tr="NET hangi teknikleri bir araya getirir?"),
             opts=[dict(en="Exposure therapy, testimony therapy and "
                           "autobiographical memory reprocessing",
                        tr="Maruz bırakma terapisi, tanıklık terapisi ve "
                           "otobiyografik bellek yeniden işleme"),
                   dict(en="Hypnosis and dream analysis",
                        tr="Hipnoz ve rüya analizi"),
                   dict(en="Medication only", tr="Yalnızca ilaç tedavisi"),
                   dict(en="Group sports and diet", tr="Grup sporu ve diyet")],
             a=0,
             why=dict(tr="Özette bu üç bileşen açıkça sayılır.")),
        dict(type="mc",
             q=dict(en="What is created in the second session of NET?",
                    tr="NET'in ikinci oturumunda ne oluşturulur?"),
             opts=[dict(en="The lifeline", tr="Yaşam çizgisi"),
                   dict(en="The final report", tr="Nihai rapor"),
                   dict(en="The medication plan", tr="İlaç planı"),
                   dict(en="The discharge letter", tr="Taburcu mektubu")],
             a=0,
             why=dict(tr="Oturum başlıklarında görüldüğü gibi ikinci oturum "
                         "'Yaşam çizgisi oluşturma' oturumudur.")),
        dict(type="tf",
             q=dict(en="According to the article, Cognitive Behavioral Therapies "
                      "are among the most empirically supported PTSD treatments.",
                    tr="Makaleye göre Bilişsel Davranışçı Terapiler, TSSB "
                       "tedavisinde en çok kanıt desteği olan yöntemler arasındadır."),
             opts=[dict(en="True", tr="Doğru"), dict(en="False", tr="Yanlış")],
             a=0,
             why=dict(tr="Özet, Bilişsel Davranışçı Terapiler ve Uzatılmış Maruz "
                         "Bırakma Terapisini en çok ampirik destek gören yöntemler "
                         "olarak anar.")),
        dict(type="mc",
             q=dict(en="For which kind of trauma is NET described as especially promising?",
                    tr="NET özellikle hangi tür travma için umut verici sayılır?"),
             opts=[dict(en="Complex trauma", tr="Karmaşık travma"),
                   dict(en="Mild stress", tr="Hafif stres"),
                   dict(en="Physical injury only", tr="Yalnızca fiziksel yaralanma"),
                   dict(en="Childhood shyness", tr="Çocukluk çekingenliği")],
             a=0,
             why=dict(tr="Özet, NET'in özellikle karmaşık travmanın tedavisinde "
                         "umut verici bir yaklaşım olarak öne çıktığını söyler.")),
        dict(type="gap",
             q=dict(en="The purpose of the article is to increase the use of NET "
                      "by experts and in ___.",
                    tr="Makalenin amacı, NET'in uzmanlarca ve ___ kullanımını "
                       "artırmaktır."),
             opts=[dict(en="Türkiye", tr="Türkiye'de"),
                   dict(en="Germany", tr="Almanya'da"),
                   dict(en="Syria", tr="Suriye'de"),
                   dict(en="the USA", tr="ABD'de")],
             a=0,
             why=dict(tr="Makale, yöntemin Türkiye'de daha yaygın kullanılmasını "
                         "hedeflediğini belirtir.")),
        dict(type="mc",
             q=dict(en="What happens in the first session of NET?",
                    tr="NET'in ilk oturumunda ne yapılır?"),
             opts=[dict(en="Diagnosis, assessment and psychoeducation",
                        tr="Tanı, değerlendirme ve psikoeğitim"),
                   dict(en="Writing the final narrative",
                        tr="Nihai anlatının yazılması"),
                   dict(en="Family therapy", tr="Aile terapisi"),
                   dict(en="Discharge from treatment", tr="Tedaviden çıkış")],
             a=0,
             why=dict(tr="Oturum başlığı: 'Tanı-değerlendirme ve psikoeğitim'.")),
        dict(type="match",
             q=dict(en="Match each English term with its Turkish meaning.",
                    tr="Her İngilizce terimi Türkçe karşılığıyla eşleştirin."),
             pairs=[("holistic", "bütüncül"), ("narrative", "anlatı"),
                    ("exposure", "maruz bırakma"), ("chronological", "kronolojik"),
                    ("effectiveness", "etkililik")],
             a=0,
             why=dict(tr="Bu terimler makalenin başlığında ve özetinde geçer.")),
    ]),
}
