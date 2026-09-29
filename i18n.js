/* 場面の手引き・そよぎ 多言語テーブル(そよぎアプリ・キット v1・12言語)
   ・window.TEBIKI_I18N = { ja, en, de, fr, es, it, pt, nl, sv, ko, zh, ar }
   ・キー構造は全言語で完全一致(_check.js が ja を正として構造・配列要素数を機械照合)
   ・🔴 BUILDER: 文言は ja と en の両方に同じキーで足す。画面固有は screen.<画面id>.* に置く。
     de〜ar の10言語は、翻訳Workflowで差し替えるまで en を自動で流用する(末尾の仮置き)
   ・{n} などのプレースホルダは app.js/screens が実値に差し替える(訳文でも記号のまま残す)
   ・set.lang は言語切替ラベルなので全言語 'ことば / Language' 固定
   ・ar は RTL。app.js が document.dir='rtl' にする
   ・ひらがな: 本人が読む操作文言はひらがな主体。相手に見せる文(みせる画面等)は漢字で曖昧さを消す
   ・辞典(data/dict.ja.js)の中身は日本語のみ。en は見出しと「日本語のみ」の案内だけ */
(function(){
'use strict';

/* ============ ja(正) ============ */
var ja = {
  app: { name:'場面の手引き・そよぎ', short:'場面の手引き', tagline:'場面に入る前に引く、自分のための手引き。' },
  nav: { home:'ホーム', bamen:'ばめん', after:'あとで', call:'いま電話', set:'せってい' },
  common: {
    ok:'OK', cancel:'やめる', save:'ほぞんする', del:'けす', back:'もどる', close:'とじる',
    yes:'はい', no:'いいえ', add:'ついか', edit:'なおす', next:'つぎ', prev:'まえ', done:'できた',
    saved:'ほぞんしました ✓', saveFail:'ほぞんできませんでした', storageFull:'いっぱいで ほぞんできません',
    deleted:'けしました', delConfirm:'ほんとうに けしますか?', empty:'まだ なにも ありません',
    backConfirm:'書いたことは まだ ほぞんしていません。すてて もどりますか?',
    optional:'ぜんぶ 書かなくても だいじょうぶです。', today:'きょう',
    tags: { all:'すべて', work:'職場', school:'学校', hospital:'病院', shop:'店', family:'家族', phone:'電話', rule:'わたしのルール集' },
    tagLabel:'ばめん',
    emptyTag:'「{t}」には まだ ありません。',
    exp: {
      btn:'文字で 書き出す',
      hint:'他の人の 名前・会社名・電話番号は、ここで 伏せてから コピーしてください。ここで 書きかえても、ほぞんした 中身は かわりません。',
      copy:'コピーする', copied:'コピーしました ✓',
      copyFail:'コピーできませんでした。文字を えらんで コピーしてください。'
    },
    photo: {
      camera:'カメラで とる', roll:'しゃしんから えらぶ',
      cropTitle:'しゃしんを 切りとる', cropHint:'ゆびで うごかすか、やじるしで あわせて、スライダーで 大きさを かえます。',
      zoom:'大きさ', panUp:'うえへ', panDown:'したへ', panLeft:'ひだりへ', panRight:'みぎへ',
      make:'これで きめる', fail:'しゃしんを よみこめませんでした'
    }
  },
  set: {
    hNormal:'ふだんの せってい',
    hBackup:'きしゅへんこう(バックアップ)',
    fs:'もじの大きさ', fsSizes:['ふつう','大きい','とても大きい'],
    lang:'ことば / Language',
    theme:'いろ', themes:['みどり','みずいろ','しろ','くろ'],
    bgm:'BGM', bgms:['なし','みどりの音','あおの音'],
    sound:'タップ音', on:'ON', off:'OFF',
    bkHint:'あたらしい スマホに うつるときは、「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。',
    bkExport:'かきだす', bkImport:'よみこむ',
    exported:'かきだしました ✓', imported:'よみこみました ✓', importFail:'よみこめませんでした',
    importConfirm:'いまの 中身は、ファイルの 中身に おきかわります。よみこみますか?',
    note:'書いたことは すべて この端末の中だけに ほぞんされます。どこにも 送られません。',
    privacy:'プライバシーポリシー',
    credit:'アプリ開発：介護と支援の相談どころ そよぎ'
  },
  /* はじめての つかいかた(app.js openGuide・初回に必ず出す・2026-09-30)。heads と bodies は同じ数。
     ボタンの名前は画面の文字と同じにする(画面の文言を変えたら ここも直す) */
  guide: {
    title:'つかいかた', step:'{n} / {m}', start:'はじめる', again:'もういちど 見る',
    heads:[
      '場面の手引きへ ようこそ',
      'ホームと 下の ならび',
      '言い方の じてん',
      'じぶんの だいほん',
      '言う前の てんけん',
      'あとで 書く(失敗と つぎ)',
      'いま電話',
      'この端末の中だけに のこります'
    ],
    bodies:[
      'ばめんに 入る前に 引いて、うまく いかなかった あとに 書く、自分のための 手引きです。\n言葉どおりに 受けとりやすい 人や、人前で 練習せずに 一人で そなえたい 人の ための 道具です。\n責めたり、よい わるいを 決めたりは しません。さいしょに 決めておく ことも ありません。',
      'ホームの「ばめんを えらぶ」は、場面に 入る前に つかいます。「言い方の じてん」「じぶんの だいほん」「言う前の てんけん」が あります。\n「あとで 書く」は うまく いかなかった あとに、「いま電話」は 電話を 聞きながら つかいます。\n下の ならびの「ばめん」「あとで」「いま電話」からも、おなじ 画面に 行けます。',
      'よく 聞く 言い方を 引けます。「ことばで さがす」に 書くか、ばめんの ボタンで しぼります。\n言い方を おすと、「言葉どおりの意味」「ありがちな意味(候補)」「たしかめ方の一言」が 出ます。\n意味は 相手や ときによって ちがいます。まよったら 聞いて たしかめるのが いちばんです。\n「この言い方の だいほんを 書く」で、そのまま だいほんを 書きはじめられます。',
      'ばめんごとに、自分が 言うこと・することを 書きためます。自分で 決めた きまりは「わたしのルール集」に ためます。\n「あたらしく 書く」で ばめん・だい・だいほんを 書いて、「ほぞんする」を おします。\nほぞんした だいほんを ひらいて「大きく 見る」を おすと、その場で 大きな 字で 見られます。',
      'これから 言うことを 書いて、「てんけんを はじめる」を おします。\n相手・場所・時間・相手は どう感じるか の 4つの 問いに、「つぎ」で じゅんばんに 答えます。決めつけなくて だいじょうぶです。\n「見返す」で 4つの 答えを ならべて 見たら、「ほぞんして おく」か「ほぞんしないで おわる」を えらびます。',
      'うまく いかなかったことを、責めずに「なにが あった」「あとで 気づいた」「つぎに ためす」「たのめること」の 4つの 段で 残します。\n「あたらしく 書く」で ばめんを えらんで 書き、「ほぞんする」を おします。あとから ばめんの ボタンで しぼって 読み返せます。\n一覧の 下の「文字で 書き出す」で、文字に して コピーできます。他の人の 名前や 会社名は 伏せてから コピーしてください。',
      '電話を 聞きながら、「だれから」「ようけん」「いつまで」「おりかえし先」の 4つの 欄に 書きます。書いた 字は ほかの 画面に 行っても のこります。\n「大きく 見る」で 大きな 字に、「この電話を のこす」で「さいきんの 電話」に のこせます(5件まで)。\n「欄を からにする」は、つぎに「はい」を おしたときだけ からに なります。\n「聞き返すときの 言い方」は、おすと 大きな 字で 出ます。',
      '書いたことは すべて この端末の中だけに ほぞんされ、どこにも 送られません。\nあたらしい スマホに うつるときは、「せってい」の「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。\n「せってい」の「もじの大きさ」と「いろ」で 見やすく できます。ことばは 画面の いちばん上の「Language」で えらべます。\nこの 案内は、「せってい」の「つかいかた」の「もういちど 見る」で また 見られます。'
    ]
  },
  screen: {
    home: {
      title:'場面の手引き',
      bamen:'ばめんを えらぶ', bamenSub:'じてん・だいほん・言う前の てんけん',
      after:'あとで 書く', afterSub:'なにが あった → つぎに ためす',
      call:'いま電話', callSub:'だれから・ようけん・いつまで・おりかえし',
      note:'ここに 書いたことは、この端末の中だけに のこります。'
    },
    bamen: {
      title:'ばめんを えらぶ',
      hint:'ばめんに 入る前に、ひとつ えらんでください。',
      dict:'言い方の じてん', dictSub:'言葉どおり / ありがちな意味 / たしかめ方', dictJaOnly:'(日本語のみ)',
      script:'じぶんの だいほん', scriptSub:'ばめんごとに 書きためる(わたしのルール集も ここ)',
      precheck:'言う前の てんけん', precheckSub:'相手・場所・時間・相手は どう感じるか'
    },
    dict: {
      title:'言い方の じてん',
      search:'ことばで さがす', searchPh:'たとえば「検討」「また」',
      count:'{n} 語',
      lit:'言葉どおりの意味', maybe:'ありがちな意味(候補)', ask:'たしかめ方の一言',
      caution:'意味は 相手や ときによって ちがいます。ここに あるのは「よくある候補」です。まよったら 聞いて たしかめるのが いちばんです。',
      jaOnly:'この じてんは 日本語だけです。',
      noHit:'見つかりませんでした。べつの ことばで さがしてみてください。',
      toScript:'この言い方の だいほんを 書く',
      draftTitle:'「{w}」と言われたとき'
    },
    script: {
      title:'じぶんの だいほん',
      hint:'ばめんごとに、自分が 言うこと・することを 書きためます。「わたしのルール集」は、自分で 決めた きまりを ためる ところです。',
      add:'あたらしく 書く', edit:'だいほんを なおす',
      tag:'ばめん', name:'だい', namePh:'たとえば「病院で 薬の説明を聞くとき」',
      body:'だいほん', bodyPh:'言うこと・することを じゅんばんに。\nたとえば「1. 名前を言う 2. 用件を 一つだけ言う 3. 分からなければ「もう一度 お願いします」」',
      show:'大きく 見る',
      empty:'まだ だいほんは ありません。「あたらしく 書く」から はじめられます。',
      needName:'だいを 書いてください'
    },
    precheck: {
      title:'言う前の てんけん',
      hint:'これから 言うことを 書いて、4つの 問いに じゅんばんに 答えます。答えは 自分で 見返すためのもので、ほぞんは 任意です。',
      say:'これから 言うこと', sayPh:'たとえば「来週の当番を 代わってほしい」',
      q: ['相手は だれですか', '場所は どこですか', '時間は いつですか(相手は いそがしいときですか)', '相手は それを聞いて どう感じそうですか'],
      qPh: ['たとえば「同じ班の 田中さん(仮)」', 'たとえば「休けい室」', 'たとえば「昼休みの おわりごろ」', 'たとえば「急に言われて 困るかもしれない」'],
      qHint: ['名前が 分からなければ、立場(上司・先生・受付の人)で だいじょうぶです。', '人が まわりに いる場所か、二人だけかも 書いておくと 見返しやすいです。', '相手が 手を止められる 時間かどうかを 考えます。', '決めつけなくて だいじょうぶです。「かもしれない」で 書きます。'],
      step:'{n} / 4',
      start:'てんけんを はじめる', review:'見返す',
      reviewTitle:'見返し',
      reviewHint:'4つの答えを 見て、言い方や タイミングを 変えるか 考えます。変えなくても だいじょうぶです。',
      redo:'もう一度', saveIt:'ほぞんして おく', noSave:'ほぞんしないで おわる',
      saved:'ほぞんしました。「ばめん」の「言う前の てんけん」から 見返せます。',
      history:'ほぞんした てんけん(30件まで)',
      needSay:'言うことを 書いてください',
      unanswered:'(まだ 書いていません)',
      quote:'「{s}」'
    },
    after: {
      title:'あとで 書く(失敗と つぎ)',
      hint:'うまく いかなかったことを、責めずに 4つの 段で 残します。ばめんの タグで あとから 読み返せます。',
      add:'あたらしく 書く', edit:'なおす',
      tag:'ばめん',
      f: ['なにが あった', 'あとで 気づいた', 'つぎに ためす', 'たのめること'],
      fPh: ['たとえば「「検討します」を 本気だと思って 待っていた」', 'たとえば「断りの 言い方だったかもしれない」', 'たとえば「次は「いつごろ 返事を もらえますか」と 聞いてみる」', 'たとえば「家族に「この返事は どう思う?」と 聞く」'],
      fHint: ['起きたことだけを 書きます。よい・わるいは 書かなくて だいじょうぶです。', '時間が たってから 分かったことを 書きます。', '小さなことで だいじょうぶです。ひとつだけ。', '人に たのめることが あれば。なければ 空でも だいじょうぶです。'],
      show:'大きく 見る',
      empty:'まだ ありません。うまく いかなかったことが あったら、ここに 残せます。',
      needWhat:'「なにが あった」を 書いてください',
      none:'(なし)',
      exportHint:'書き出すときは、他の人の 名前や 会社名などを 伏せてください。'
    },
    call: {
      title:'いま電話',
      hint:'電話を 聞きながら 4つの 欄に 書きます。数字は 大きく 出ます。直近 5件だけ 残ります。',
      f: ['だれから', 'ようけん', 'いつまで', 'おりかえし先'],
      fPh: ['会社名・名前', 'ひとことで', '日にち・時刻', '電話番号・名前'],
      save:'この電話を のこす', clear:'欄を からにする', clearConfirm:'ほんとうに 欄を からにしますか?',
      show:'大きく 見る',
      recent:'さいきんの 電話(5件まで)',
      empty:'まだ ありません。',
      needAny:'どれか ひとつは 書いてください',
      askBack:'聞き返すときの 言い方',
      askPhrases: ['もう一度 ゆっくり お願いします', '文字で 送っていただけますか', '折り返しますので お電話番号を お願いします', '確認して かけ直します']
    }
  }
};

/* ============ en ============ */
var en = {
  app: { name:'Situation Guide - SOYOGI', short:'Situation Guide', tagline:'Your own guide to look up before you step into a situation.' },
  nav: { home:'Home', bamen:'Situations', after:'Afterward', call:'Call now', set:'Settings' },
  common: {
    ok:'OK', cancel:'Cancel', save:'Save', del:'Delete', back:'Back', close:'Close',
    yes:'Yes', no:'No', add:'Add', edit:'Edit', next:'Next', prev:'Previous', done:'Done',
    saved:'Saved ✓', saveFail:'Could not save', storageFull:'Storage is full, could not save',
    deleted:'Deleted', delConfirm:'Really delete this?', empty:'Nothing here yet',
    backConfirm:'What you wrote is not saved yet. Discard it and go back?',
    optional:'You do not have to fill in everything.', today:'Today',
    tags: { all:'All', work:'Work', school:'School', hospital:'Hospital', shop:'Shop', family:'Family', phone:'Phone', rule:'My rules' },
    tagLabel:'Situation',
    emptyTag:'Nothing under "{t}" yet.',
    exp: {
      btn:'Export as text',
      hint:'Hide other people\'s names, company names and phone numbers here before you copy. Changes here do not change what you saved.',
      copy:'Copy', copied:'Copied ✓',
      copyFail:'Could not copy. Please select the text and copy it.'
    },
    photo: {
      camera:'Take a photo', roll:'Choose from photos',
      cropTitle:'Crop the photo', cropHint:'Drag with a finger or use the arrows, then change the size with the slider.',
      zoom:'Size', panUp:'Up', panDown:'Down', panLeft:'Left', panRight:'Right',
      make:'Use this', fail:'Could not load the photo'
    }
  },
  set: {
    hNormal:'Everyday settings',
    hBackup:'Changing phones (backup)',
    fs:'Text size', fsSizes:['Normal','Large','Very large'],
    lang:'ことば / Language',
    theme:'Color', themes:['Green','Light blue','White','Black'],
    bgm:'Music', bgms:['None','Green tone','Blue tone'],
    sound:'Tap sound', on:'ON', off:'OFF',
    bkHint:'When you move to a new phone, tap "Export" to save a file, then tap "Import" on the new phone.',
    bkExport:'Export', bkImport:'Import',
    exported:'Exported ✓', imported:'Imported ✓', importFail:'Could not import',
    importConfirm:'Your current entries will be replaced with the file\'s contents. Import it?',
    note:'Everything you write is stored only on this device. Nothing is sent anywhere.',
    privacy:'Privacy policy',
    credit:'Developed by SOYOGI, a care and support consultation service'
  },
  guide: {
    title:'How to use', step:'{n} / {m}', start:'Start', again:'Show again',
    heads:[
      'Welcome to Situation Guide',
      'Home and the bottom tabs',
      'Phrase book',
      'My scripts',
      'Check before speaking',
      'Write afterward',
      'Call now',
      'Stays on this device only'
    ],
    bodies:[
      'Your own guide to look up before you step into a situation, and to write in after something did not go well.\nIt is a tool for people who tend to take words literally, or who want to prepare alone without practicing in front of others.\nNothing here blames you or judges good or bad. There is nothing you need to set up first.',
      'On Home, "Choose a situation" is for before you step into a situation. It holds the "Phrase book", "My scripts" and "Check before speaking".\n"Write afterward" is for after something did not go well, and "Call now" is for while you are listening on the phone.\nThe bottom tabs "Situations", "Afterward" and "Call now" open the same screens.',
      'Look up phrases people often say (in Japanese only), by typing in "Search by word" or with the situation buttons.\nTap a phrase to see its "Literal meaning", "Likely meanings (candidates)" and "One line to check".\nMeanings differ by person and moment. When in doubt, asking is the surest way.\n"Write a script for this phrase" starts a script right away.',
      'Write what you say and do, per situation. Keep the rules you decided for yourself under "My rules".\nTap "Write a new one", fill in the situation, title and script, then tap "Save".\nOpen a saved script and tap "Show large" to read it in big letters on the spot.',
      'Write what you are about to say and tap "Start the check".\nWith "Next", answer four questions in order: who, where, when, and how they may feel. No need to be sure.\nTap "Look back" to see the four answers together, then choose "Save this" or "Finish without saving".',
      'Keep what did not go well in four steps, without blame: "What happened", "What I noticed later", "What to try next" and "What I can ask for".\nTap "Write a new one", choose the situation, write, and tap "Save". Later you can read back by situation.\n"Export as text" under a list lets you copy it as text. Hide other people\'s names and company names before you copy.',
      'While you listen on the phone, write in the four fields: "From", "Matter", "By when" and "Call back to". What you type stays even if you go to another screen.\n"Show large" shows it in big letters, and "Keep this call" keeps it under "Recent calls" (up to 5).\n"Clear fields" empties the fields only after you also tap "Yes".\nTap one of the "Phrases to ask again" to show it in big letters.',
      'Everything you write is stored only on this device and is never sent anywhere.\nWhen you move to a new phone, tap "Export" in "Settings" to save a file, then tap "Import" on the new phone.\n"Text size" and "Color" in "Settings" make the screen easier to see. Choose a language with "Language" at the top of the screen.\nYou can see this guide again with "Show again" next to "How to use" in "Settings".'
    ]
  },
  screen: {
    home: {
      title:'Situation Guide',
      bamen:'Choose a situation', bamenSub:'Phrase book, my scripts, check before speaking',
      after:'Write afterward', afterSub:'What happened → what to try next',
      call:'Call now', callSub:'Who, what, by when, call back',
      note:'Everything you write here stays on this device only.'
    },
    bamen: {
      title:'Choose a situation',
      hint:'Pick one before you step into the situation.',
      dict:'Phrase book', dictSub:'Literal meaning / likely meanings / how to check', dictJaOnly:'(Japanese only)',
      script:'My scripts', scriptSub:'Write per situation (my rules live here too)',
      precheck:'Check before speaking', precheckSub:'Who, where, when, how they may feel'
    },
    dict: {
      title:'Phrase book',
      search:'Search by word', searchPh:'e.g. 検討',
      count:'{n} entries',
      lit:'Literal meaning', maybe:'Likely meanings (candidates)', ask:'One line to check',
      caution:'Meanings differ by person and moment. These are common candidates only. When in doubt, asking is the surest way.',
      jaOnly:'This phrase book is in Japanese only.',
      noHit:'No match. Try another word.',
      toScript:'Write a script for this phrase',
      draftTitle:'When someone says "{w}"'
    },
    script: {
      title:'My scripts',
      hint:'Write what you say and do, per situation. "My rules" is where you keep the rules you decided for yourself.',
      add:'Write a new one', edit:'Edit script',
      tag:'Situation', name:'Title', namePh:'e.g. "Listening to the pharmacist"',
      body:'Script', bodyPh:'What to say and do, in order.',
      show:'Show large',
      empty:'No scripts yet. Start with "Write a new one".',
      needName:'Please write a title'
    },
    precheck: {
      title:'Check before speaking',
      hint:'Write what you are about to say, then answer four questions in order. The answers are for you to look back on. Saving is optional.',
      say:'What I am about to say', sayPh:'e.g. "Could you swap shifts with me next week"',
      q: ['Who is the other person?', 'Where?', 'When? (Are they busy right now?)', 'How might they feel hearing it?'],
      qPh: ['e.g. "Tanaka from my team"', 'e.g. "the break room"', 'e.g. "near the end of lunch break"', 'e.g. "they may be put on the spot"'],
      qHint: ['If you do not know the name, a role (boss, teacher, receptionist) is fine.', 'Note whether others are around or it is just the two of you.', 'Think about whether they can stop what they are doing.', 'No need to be sure. Write it as "maybe".'],
      step:'{n} / 4',
      start:'Start the check', review:'Look back',
      reviewTitle:'Look back',
      reviewHint:'Read the four answers and decide whether to change the wording or the timing. Keeping it as is, is fine too.',
      redo:'Do it again', saveIt:'Save this', noSave:'Finish without saving',
      saved:'Saved. You can find it under "Check before speaking".',
      history:'Saved checks (up to 30)',
      needSay:'Please write what you will say',
      unanswered:'(not written yet)',
      quote:'"{s}"'
    },
    after: {
      title:'Write afterward',
      hint:'Keep what did not go well in four steps, without blame. Read back by situation tag later.',
      add:'Write a new one', edit:'Edit',
      tag:'Situation',
      f: ['What happened', 'What I noticed later', 'What to try next', 'What I can ask for'],
      fPh: ['e.g. "I took "we will consider it" literally and kept waiting"', 'e.g. "it may have been a soft no"', 'e.g. "next time ask "when can I expect a reply?""', 'e.g. "ask family what they think of the reply"'],
      fHint: ['Only what happened. No need to judge good or bad.', 'What became clear after some time.', 'Something small is fine. Just one.', 'If there is something you can ask someone for. Empty is fine.'],
      show:'Show large',
      empty:'Nothing yet. When something does not go well, you can keep it here.',
      needWhat:'Please write "What happened"',
      none:'(none)',
      exportHint:'When exporting, hide other people\'s names and company names.'
    },
    call: {
      title:'Call now',
      hint:'Fill in four fields while listening. Numbers show large. Only the latest 5 are kept.',
      f: ['From', 'Matter', 'By when', 'Call back to'],
      fPh: ['company, name', 'in a few words', 'date, time', 'phone number, name'],
      save:'Keep this call', clear:'Clear fields', clearConfirm:'Really clear the fields?',
      show:'Show large',
      recent:'Recent calls (up to 5)',
      empty:'Nothing yet.',
      needAny:'Please fill in at least one field',
      askBack:'Phrases to ask again',
      askPhrases: ['Could you say that again slowly?', 'Could you send it in writing?', 'I will call back, may I have your number?', 'I will check and call you back']
    }
  }
};

var TBL = { ja: ja, en: en };
/* 翻訳の差し込み用: en の複製に訳を重ねる(足りないキーは en のまま) */
function mergeDeep(t, s){ for(var k in s){ if(s[k] && typeof s[k] === 'object' && !Array.isArray(s[k])){ if(!t[k] || typeof t[k] !== 'object') t[k] = {}; mergeDeep(t[k], s[k]); } else t[k] = s[k]; } return t; }
/* ---- de: 翻訳 ---- */
TBL.de = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Situationsleitfaden - SOYOGI",
    "short": "Situationsleitfaden",
    "tagline": "Ihr eigener Leitfaden zum Nachschlagen, bevor eine Situation beginnt."
  },
  "nav": {
    "home": "Start",
    "bamen": "Situationen",
    "after": "Später",
    "call": "Am Telefon",
    "set": "Optionen"
  },
  "common": {
    "ok": "OK",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "del": "Löschen",
    "back": "Zurück",
    "close": "Schließen",
    "yes": "Ja",
    "no": "Nein",
    "add": "Hinzufügen",
    "edit": "Bearbeiten",
    "next": "Weiter",
    "prev": "Vorherige",
    "done": "Fertig",
    "saved": "Gespeichert ✓",
    "saveFail": "Speichern nicht möglich",
    "storageFull": "Der Speicher ist voll. Speichern nicht möglich.",
    "deleted": "Gelöscht",
    "delConfirm": "Wirklich löschen?",
    "empty": "Noch nichts vorhanden",
    "backConfirm": "Was Sie geschrieben haben, ist noch nicht gespeichert. Verwerfen und zurückgehen?",
    "optional": "Sie müssen nicht alles ausfüllen.",
    "today": "Heute",
    "tags": {
      "all": "Alle",
      "work": "Arbeit",
      "school": "Schule",
      "hospital": "Krankenhaus",
      "shop": "Geschäft",
      "family": "Familie",
      "phone": "Telefon",
      "rule": "Meine Regeln"
    },
    "tagLabel": "Situation",
    "emptyTag": "Unter „{t}“ gibt es noch nichts.",
    "exp": {
      "btn": "Als Text exportieren",
      "hint": "Machen Sie hier Namen anderer Personen, Firmennamen und Telefonnummern unkenntlich, bevor Sie kopieren. Änderungen hier ändern nicht, was Sie gespeichert haben.",
      "copy": "Kopieren",
      "copied": "Kopiert ✓",
      "copyFail": "Kopieren nicht möglich. Bitte markieren Sie den Text und kopieren Sie ihn."
    },
    "photo": {
      "camera": "Foto aufnehmen",
      "roll": "Aus Fotos wählen",
      "cropTitle": "Foto zuschneiden",
      "cropHint": "Verschieben Sie das Bild mit dem Finger oder mit den Pfeilen. Mit dem Schieberegler ändern Sie die Größe.",
      "zoom": "Größe",
      "panUp": "Nach oben",
      "panDown": "Nach unten",
      "panLeft": "Nach links",
      "panRight": "Nach rechts",
      "make": "Übernehmen",
      "fail": "Das Foto konnte nicht geladen werden"
    }
  },
  "set": {
    "hNormal": "Allgemeine Einstellungen",
    "hBackup": "Gerätewechsel (Sicherung)",
    "fs": "Schriftgröße",
    "fsSizes": [
      "Normal",
      "Groß",
      "Sehr groß"
    ],
    "lang": "ことば / Language",
    "theme": "Farbe",
    "themes": [
      "Grün",
      "Hellblau",
      "Weiß",
      "Schwarz"
    ],
    "bgm": "Musik",
    "bgms": [
      "Keine",
      "Grüner Klang",
      "Blauer Klang"
    ],
    "sound": "Tippton",
    "on": "EIN",
    "off": "AUS",
    "bkHint": "Wenn Sie auf ein neues Smartphone wechseln, speichern Sie mit „Exportieren“ eine Datei. Tippen Sie dann auf dem neuen Smartphone auf „Importieren“.",
    "bkExport": "Exportieren",
    "bkImport": "Importieren",
    "exported": "Exportiert ✓",
    "imported": "Importiert ✓",
    "importFail": "Import nicht möglich",
    "importConfirm": "Ihre aktuellen Einträge werden durch den Inhalt der Datei ersetzt. Jetzt importieren?",
    "note": "Alles, was Sie schreiben, wird nur auf diesem Gerät gespeichert. Nichts wird irgendwohin gesendet.",
    "privacy": "Datenschutzerklärung",
    "credit": "Entwickelt von SOYOGI, einer Beratungsstelle für Pflege und Unterstützung"
  },
  "guide": {
    "title": "Anleitung",
    "step": "{n} / {m}",
    "start": "Starten",
    "again": "Noch einmal ansehen",
    "heads": [
      "Willkommen beim Situationsleitfaden",
      "Start und die untere Leiste",
      "Wörterbuch der Ausdrücke",
      "Meine Skripte",
      "Check vor dem Sprechen",
      "Später aufschreiben",
      "Am Telefon",
      "Nur auf diesem Gerät"
    ],
    "bodies": [
      "Ihr eigener Leitfaden: zum Nachschlagen, bevor eine Situation beginnt, und zum Aufschreiben, wenn etwas nicht gut lief.\nEr ist ein Werkzeug für Menschen, die Worte leicht wörtlich nehmen oder sich lieber allein vorbereiten, ohne vor anderen zu üben.\nNichts hier macht Vorwürfe oder beurteilt gut und schlecht. Sie müssen vorher nichts einstellen.",
      "Auf „Start“ ist „Situation wählen“ für die Zeit vor einer Situation. Dort finden Sie „Wörterbuch der Ausdrücke“, „Meine Skripte“ und „Check vor dem Sprechen“.\n„Später aufschreiben“ ist für danach, wenn etwas nicht gut lief, und „Am Telefon“ für Notizen während eines Anrufs.\nÜber die untere Leiste („Situationen“, „Später“, „Am Telefon“) kommen Sie zu denselben Seiten.",
      "Schlagen Sie oft gehörte Ausdrücke nach (nur auf Japanisch): über „Nach Wort suchen“ oder mit den Situations-Knöpfen.\nTippen Sie auf einen Ausdruck, dann sehen Sie „Wörtliche Bedeutung“, „Häufige Bedeutung (Möglichkeiten)“ und „Ein Satz zum Nachfragen“.\nDie Bedeutung hängt von Person und Moment ab. Im Zweifel fragen Sie am besten nach.\nMit „Skript zu diesem Ausdruck schreiben“ beginnen Sie gleich ein Skript.",
      "Schreiben Sie für jede Situation auf, was Sie sagen und tun. Regeln, die Sie selbst festgelegt haben, sammeln Sie in „Meine Regeln“.\nTippen Sie auf „Neu schreiben“, füllen Sie Situation, Titel und Skript aus und tippen Sie auf „Speichern“.\nÖffnen Sie ein gespeichertes Skript und tippen Sie auf „Groß anzeigen“, dann können Sie es vor Ort in großer Schrift lesen.",
      "Schreiben Sie auf, was Sie sagen möchten, und tippen Sie auf „Check starten“.\nBeantworten Sie mit „Weiter“ der Reihe nach vier Fragen: wer, wo, wann und wie es ankommen könnte. Sie müssen sich nicht sicher sein.\nMit „Nachlesen“ sehen Sie die vier Antworten zusammen. Wählen Sie dann „Speichern“ oder „Ohne Speichern beenden“.",
      "Halten Sie ohne Vorwürfe in vier Schritten fest, was nicht gut lief: „Was ist passiert“, „Was mir später aufgefallen ist“, „Was ich als Nächstes versuche“ und „Worum ich bitten kann“.\nTippen Sie auf „Neu schreiben“, wählen Sie die Situation, schreiben Sie und tippen Sie auf „Speichern“. Später können Sie nach Situation nachlesen.\nMit „Als Text exportieren“ unter der Liste kopieren Sie den Text. Machen Sie vorher Namen anderer Personen und Firmen unkenntlich.",
      "Schreiben Sie beim Zuhören in die vier Felder: „Von wem“, „Anliegen“, „Bis wann“ und „Rückruf an“. Was Sie schreiben, bleibt auch erhalten, wenn Sie auf eine andere Seite gehen.\n„Groß anzeigen“ zeigt es in großer Schrift, und „Anruf speichern“ legt es unter „Letzte Anrufe“ ab (bis zu 5).\n„Felder leeren“ leert die Felder erst, wenn Sie danach auch auf „Ja“ tippen.\nTippen Sie auf einen der „Sätze zum Nachfragen“, dann erscheint er in großer Schrift.",
      "Alles, was Sie schreiben, bleibt nur auf diesem Gerät und wird nirgendwohin gesendet.\nBeim Wechsel auf ein neues Smartphone speichern Sie in „Optionen“ mit „Exportieren“ eine Datei und tippen auf dem neuen Gerät auf „Importieren“.\nMit „Schriftgröße“ und „Farbe“ in „Optionen“ wird alles besser lesbar. Die Sprache wählen Sie ganz oben bei „Language“.\nDiese Anleitung öffnen Sie in „Optionen“ bei „Anleitung“ mit „Noch einmal ansehen“ wieder."
    ]
  },
  "screen": {
    "home": {
      "title": "Situationsleitfaden",
      "bamen": "Situation wählen",
      "bamenSub": "Wörterbuch, Skripte, Check vor dem Sprechen",
      "after": "Später aufschreiben",
      "afterSub": "Was ist passiert → was ich als Nächstes versuche",
      "call": "Am Telefon",
      "callSub": "Von wem, Anliegen, bis wann, Rückruf",
      "note": "Was Sie hier schreiben, bleibt nur auf diesem Gerät."
    },
    "bamen": {
      "title": "Situation wählen",
      "hint": "Bitte wählen Sie etwas aus, bevor die Situation beginnt.",
      "dict": "Wörterbuch der Ausdrücke",
      "dictSub": "Wörtlich / häufige Bedeutung / wie man nachfragt",
      "dictJaOnly": "(nur auf Japanisch)",
      "script": "Meine Skripte",
      "scriptSub": "Nach Situation sammeln („Meine Regeln“ auch hier)",
      "precheck": "Check vor dem Sprechen",
      "precheckSub": "Wer, wo, wann, wie es ankommen könnte"
    },
    "dict": {
      "title": "Wörterbuch der Ausdrücke",
      "search": "Nach Wort suchen",
      "searchPh": "z. B. „検討“ oder „また“",
      "count": "{n} Einträge",
      "lit": "Wörtliche Bedeutung",
      "maybe": "Häufige Bedeutung (Möglichkeiten)",
      "ask": "Ein Satz zum Nachfragen",
      "caution": "Die Bedeutung hängt von der Person und vom Moment ab. Hier stehen nur häufige Möglichkeiten. Wenn Sie unsicher sind, ist Nachfragen der beste Weg.",
      "jaOnly": "Dieses Wörterbuch gibt es nur auf Japanisch.",
      "noHit": "Nichts gefunden. Versuchen Sie es bitte mit einem anderen Wort.",
      "toScript": "Skript zu diesem Ausdruck schreiben",
      "draftTitle": "Wenn jemand „{w}“ sagt"
    },
    "script": {
      "title": "Meine Skripte",
      "hint": "Schreiben Sie für jede Situation auf, was Sie sagen und tun. In „Meine Regeln“ sammeln Sie Regeln, die Sie selbst festgelegt haben.",
      "add": "Neu schreiben",
      "edit": "Skript bearbeiten",
      "tag": "Situation",
      "name": "Titel",
      "namePh": "z. B. „Wenn mir im Krankenhaus ein Medikament erklärt wird“",
      "body": "Skript",
      "bodyPh": "Was Sie sagen und tun, der Reihe nach.\nz. B. „1. Namen sagen 2. Nur ein Anliegen nennen 3. Wenn etwas unklar ist: ‚Bitte noch einmal‘“",
      "show": "Groß anzeigen",
      "empty": "Noch keine Skripte. Sie können mit „Neu schreiben“ beginnen.",
      "needName": "Bitte schreiben Sie einen Titel."
    },
    "precheck": {
      "title": "Check vor dem Sprechen",
      "hint": "Schreiben Sie auf, was Sie sagen möchten, und beantworten Sie dann vier Fragen der Reihe nach. Die Antworten sind zum eigenen Nachlesen. Speichern ist freiwillig.",
      "say": "Was ich sagen möchte",
      "sayPh": "z. B. „Ich möchte nächste Woche den Dienst tauschen“",
      "q": [
        "Wer ist die andere Person?",
        "Wo findet es statt?",
        "Wann ist es? (Hat die Person gerade viel zu tun?)",
        "Wie könnte sich die Person fühlen, wenn sie das hört?"
      ],
      "qPh": [
        "z. B. „Tanaka aus meiner Gruppe (Beispielname)“",
        "z. B. „im Pausenraum“",
        "z. B. „gegen Ende der Mittagspause“",
        "z. B. „So plötzlich könnte es die Person in Verlegenheit bringen“"
      ],
      "qHint": [
        "Wenn Sie den Namen nicht kennen, reicht die Rolle (Vorgesetzte, Lehrkraft, Empfang).",
        "Notieren Sie auch, ob andere Menschen in der Nähe sind oder ob Sie zu zweit sind. Das hilft beim Nachlesen.",
        "Überlegen Sie, ob die Person gerade Zeit hat, kurz innezuhalten.",
        "Sie müssen sich nicht sicher sein. Schreiben Sie es mit „vielleicht“."
      ],
      "step": "{n} / 4",
      "start": "Check starten",
      "review": "Nachlesen",
      "reviewTitle": "Nachlesen",
      "reviewHint": "Sehen Sie sich die vier Antworten an und überlegen Sie, ob Sie die Worte oder den Zeitpunkt ändern möchten. Es ist auch in Ordnung, nichts zu ändern.",
      "redo": "Noch einmal",
      "saveIt": "Speichern",
      "noSave": "Ohne Speichern beenden",
      "saved": "Gespeichert. Sie können es unter „Situationen“ bei „Check vor dem Sprechen“ nachlesen.",
      "history": "Gespeicherte Checks (bis zu 30)",
      "needSay": "Bitte schreiben Sie auf, was Sie sagen möchten.",
      "unanswered": "(noch nicht ausgefüllt)",
      "quote": "„{s}“"
    },
    "after": {
      "title": "Später aufschreiben (Was nicht klappte und was als Nächstes)",
      "hint": "Halten Sie ohne Vorwürfe in vier Schritten fest, was nicht gut lief. Über den Situations-Tag können Sie es später wieder nachlesen.",
      "add": "Neu schreiben",
      "edit": "Bearbeiten",
      "tag": "Situation",
      "f": [
        "Was ist passiert",
        "Was mir später aufgefallen ist",
        "Was ich als Nächstes versuche",
        "Worum ich bitten kann"
      ],
      "fPh": [
        "z. B. „Ich hielt ‚Wir überlegen es uns‘ für ernst gemeint und habe gewartet“",
        "z. B. „Es war vielleicht eine höfliche Absage“",
        "z. B. „Nächstes Mal frage ich: ‚Wann ungefähr kann ich mit einer Antwort rechnen?‘“",
        "z. B. „Die Familie fragen: ‚Was haltet ihr von dieser Antwort?‘“"
      ],
      "fHint": [
        "Schreiben Sie nur auf, was passiert ist. Gut oder schlecht müssen Sie nicht bewerten.",
        "Schreiben Sie auf, was Ihnen erst nach einiger Zeit klar wurde.",
        "Etwas Kleines reicht. Nur eine Sache.",
        "Falls Sie jemanden um etwas bitten können. Sonst darf es leer bleiben."
      ],
      "show": "Groß anzeigen",
      "empty": "Noch nichts vorhanden. Wenn etwas nicht gut gelaufen ist, können Sie es hier festhalten.",
      "needWhat": "Bitte füllen Sie „Was ist passiert“ aus.",
      "none": "(keine Angabe)",
      "exportHint": "Machen Sie beim Exportieren bitte Namen anderer Personen, Firmennamen und Ähnliches unkenntlich."
    },
    "call": {
      "title": "Am Telefon",
      "hint": "Füllen Sie beim Zuhören die vier Felder aus. Zahlen werden groß angezeigt. Nur die letzten 5 Anrufe bleiben gespeichert.",
      "f": [
        "Von wem",
        "Anliegen",
        "Bis wann",
        "Rückruf an"
      ],
      "fPh": [
        "Firma, Name",
        "Kurz gesagt",
        "Datum, Uhrzeit",
        "Telefonnummer, Name"
      ],
      "save": "Anruf speichern",
      "clear": "Felder leeren",
      "clearConfirm": "Felder wirklich leeren?",
      "show": "Groß anzeigen",
      "recent": "Letzte Anrufe (bis zu 5)",
      "empty": "Noch nichts vorhanden.",
      "needAny": "Bitte füllen Sie mindestens ein Feld aus.",
      "askBack": "Sätze zum Nachfragen",
      "askPhrases": [
        "Könnten Sie das bitte noch einmal langsam sagen?",
        "Könnten Sie es mir bitte schriftlich schicken?",
        "Ich rufe Sie zurück. Wie ist bitte Ihre Telefonnummer?",
        "Ich kläre das und rufe Sie zurück."
      ]
    }
  }
});
/* ---- /de ---- */
/* ---- fr: 翻訳 ---- */
TBL.fr = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Guide des situations - SOYOGI",
    "short": "Guide des situations",
    "tagline": "Votre guide à vous, à consulter avant d'entrer dans une situation."
  },
  "nav": {
    "home": "Accueil",
    "bamen": "Situations",
    "after": "Après",
    "call": "Au téléphone",
    "set": "Réglages"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "del": "Supprimer",
    "back": "Retour",
    "close": "Fermer",
    "yes": "Oui",
    "no": "Non",
    "add": "Ajouter",
    "edit": "Modifier",
    "next": "Suivant",
    "prev": "Précédent",
    "done": "Terminé",
    "saved": "Enregistré ✓",
    "saveFail": "Impossible d'enregistrer",
    "storageFull": "Mémoire pleine, impossible d'enregistrer",
    "deleted": "Supprimé",
    "delConfirm": "Voulez-vous vraiment supprimer ?",
    "empty": "Rien pour l'instant",
    "backConfirm": "Ce que vous avez écrit n'est pas encore enregistré. L'abandonner et revenir en arrière ?",
    "optional": "Pas besoin de tout remplir.",
    "today": "Aujourd'hui",
    "tags": {
      "all": "Tous",
      "work": "Travail",
      "school": "École",
      "hospital": "Hôpital",
      "shop": "Magasin",
      "family": "Famille",
      "phone": "Téléphone",
      "rule": "Mes règles"
    },
    "tagLabel": "Situation",
    "emptyTag": "Rien pour l'instant dans \"{t}\".",
    "exp": {
      "btn": "Exporter en texte",
      "hint": "Avant de copier, masquez ici les noms des autres personnes, les noms d'entreprise et les numéros de téléphone. Ce que vous modifiez ici ne change pas ce que vous avez enregistré.",
      "copy": "Copier",
      "copied": "Copié ✓",
      "copyFail": "Impossible de copier. Sélectionnez le texte et copiez-le."
    },
    "photo": {
      "camera": "Prendre une photo",
      "roll": "Choisir dans les photos",
      "cropTitle": "Recadrer la photo",
      "cropHint": "Déplacez avec le doigt ou avec les flèches, puis changez la taille avec le curseur.",
      "zoom": "Taille",
      "panUp": "Haut",
      "panDown": "Bas",
      "panLeft": "Gauche",
      "panRight": "Droite",
      "make": "Valider",
      "fail": "Impossible de charger la photo"
    }
  },
  "set": {
    "hNormal": "Réglages habituels",
    "hBackup": "Changer de téléphone (sauvegarde)",
    "fs": "Taille du texte",
    "fsSizes": [
      "Normale",
      "Grande",
      "Très grande"
    ],
    "lang": "ことば / Language",
    "theme": "Couleur",
    "themes": [
      "Vert",
      "Bleu clair",
      "Blanc",
      "Noir"
    ],
    "bgm": "Musique",
    "bgms": [
      "Aucune",
      "Son vert",
      "Son bleu"
    ],
    "sound": "Son au toucher",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Pour passer sur un nouveau téléphone, touchez \"Exporter\" pour enregistrer un fichier, puis touchez \"Importer\" sur le nouveau téléphone.",
    "bkExport": "Exporter",
    "bkImport": "Importer",
    "exported": "Exporté ✓",
    "imported": "Importé ✓",
    "importFail": "Impossible d'importer",
    "importConfirm": "Vos contenus actuels seront remplacés par ceux du fichier. Voulez-vous importer ?",
    "note": "Tout ce que vous écrivez reste uniquement sur cet appareil. Rien n'est envoyé nulle part.",
    "privacy": "Politique de confidentialité",
    "credit": "Développé par SOYOGI, service de conseil en aide et en soutien"
  },
  "guide": {
    "title": "Mode d'emploi",
    "step": "{n} / {m}",
    "start": "Commencer",
    "again": "Revoir",
    "heads": [
      "Bienvenue dans Guide des situations",
      "L'accueil et les onglets du bas",
      "Lexique des expressions",
      "Mes scripts",
      "Vérification avant de parler",
      "Écrire après coup",
      "Au téléphone",
      "Uniquement sur cet appareil"
    ],
    "bodies": [
      "Votre guide à vous : à consulter avant d'entrer dans une situation, et à remplir quand quelque chose ne s'est pas bien passé.\nC'est un outil pour les personnes qui prennent facilement les mots au pied de la lettre, ou qui veulent se préparer seules, sans s'entraîner devant les autres.\nIci, rien ne vous fait de reproches ni ne juge ce qui est bien ou mal. Il n'y a rien à régler au départ.",
      "Sur \"Accueil\", \"Choisir une situation\" sert avant d'entrer dans une situation. On y trouve \"Lexique des expressions\", \"Mes scripts\" et \"Vérification avant de parler\".\n\"Écrire après coup\" sert quand quelque chose ne s'est pas bien passé, et \"Au téléphone\" pendant un appel.\nLes onglets du bas \"Situations\", \"Après\" et \"Au téléphone\" ouvrent les mêmes écrans.",
      "Cherchez des expressions qu'on entend souvent (en japonais seulement), en écrivant dans \"Chercher un mot\" ou avec les boutons de situation.\nTouchez une expression pour voir \"Sens littéral\", \"Sens courants (possibilités)\" et \"Une phrase pour vérifier\".\nLe sens change selon la personne et le moment. En cas de doute, le mieux est de demander pour vérifier.\n\"Écrire un script pour cette expression\" commence tout de suite un script.",
      "Pour chaque situation, notez ce que vous dites et ce que vous faites. Gardez les règles que vous avez fixées vous-même dans \"Mes règles\".\nTouchez \"Écrire un nouveau script\", remplissez la situation, le titre et le script, puis touchez \"Enregistrer\".\nOuvrez un script enregistré et touchez \"Afficher en grand\" pour le lire en gros caractères sur le moment.",
      "Écrivez ce que vous allez dire et touchez \"Commencer la vérification\".\nAvec \"Suivant\", répondez dans l'ordre à 4 questions : qui, où, quand, et ce que l'autre peut ressentir. Inutile de trancher.\nTouchez \"Relire\" pour voir les 4 réponses ensemble, puis choisissez \"Enregistrer\" ou \"Terminer sans enregistrer\".",
      "Notez sans reproches, en 4 étapes, ce qui n'a pas bien marché : \"Ce qui s'est passé\", \"Ce que j'ai remarqué après\", \"À essayer la prochaine fois\" et \"Ce que je peux demander\".\nTouchez \"Écrire une nouvelle note\", choisissez la situation, écrivez, puis touchez \"Enregistrer\". Vous pourrez relire plus tard par situation.\n\"Exporter en texte\", sous une liste, permet de copier le texte. Masquez d'abord les noms des autres personnes et des entreprises.",
      "Pendant l'appel, écrivez dans les 4 champs : \"Qui appelle\", \"Objet\", \"Pour quand\" et \"Pour rappeler\". Ce que vous écrivez reste, même si vous allez sur un autre écran.\n\"Afficher en grand\" l'affiche en gros caractères, et \"Garder cet appel\" le range dans \"Appels récents\" (5 au maximum).\n\"Vider les champs\" ne vide les champs qu'après avoir aussi touché \"Oui\".\nTouchez une des \"Phrases pour faire répéter\" pour l'afficher en gros caractères.",
      "Tout ce que vous écrivez reste uniquement sur cet appareil et n'est envoyé nulle part.\nPour passer sur un nouveau téléphone, touchez \"Exporter\" dans \"Réglages\" pour enregistrer un fichier, puis touchez \"Importer\" sur le nouveau téléphone.\n\"Taille du texte\" et \"Couleur\" dans \"Réglages\" rendent l'écran plus lisible. La langue se choisit tout en haut de l'écran, avec \"Language\".\nVous pouvez revoir ce guide dans \"Réglages\", avec \"Revoir\" à la ligne \"Mode d'emploi\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Guide des situations",
      "bamen": "Choisir une situation",
      "bamenSub": "Lexique, mes scripts, vérification avant de parler",
      "after": "Écrire après coup",
      "afterSub": "Ce qui s'est passé → à essayer la prochaine fois",
      "call": "Au téléphone",
      "callSub": "Qui appelle, objet, pour quand, rappel",
      "note": "Ce que vous écrivez ici reste uniquement sur cet appareil."
    },
    "bamen": {
      "title": "Choisir une situation",
      "hint": "Avant d'entrer dans la situation, choisissez-en une.",
      "dict": "Lexique des expressions",
      "dictSub": "Sens littéral / sens courant / comment vérifier",
      "dictJaOnly": "(en japonais seulement)",
      "script": "Mes scripts",
      "scriptSub": "À écrire situation par situation (mes règles sont ici aussi)",
      "precheck": "Vérification avant de parler",
      "precheckSub": "Qui, où, quand, ce que l'autre peut ressentir"
    },
    "dict": {
      "title": "Lexique des expressions",
      "search": "Chercher un mot",
      "searchPh": "par exemple 検討 ou また",
      "count": "{n} expressions",
      "lit": "Sens littéral",
      "maybe": "Sens courants (possibilités)",
      "ask": "Une phrase pour vérifier",
      "caution": "Le sens change selon la personne et le moment. Ce qui est ici, ce sont des \"possibilités courantes\". En cas de doute, le mieux est de demander pour vérifier.",
      "jaOnly": "Ce lexique existe en japonais seulement.",
      "noHit": "Aucun résultat. Essayez avec un autre mot.",
      "toScript": "Écrire un script pour cette expression",
      "draftTitle": "Quand on me dit \"{w}\""
    },
    "script": {
      "title": "Mes scripts",
      "hint": "Pour chaque situation, notez petit à petit ce que vous dites et ce que vous faites. \"Mes règles\" est l'endroit où garder les règles que vous avez fixées vous-même.",
      "add": "Écrire un nouveau script",
      "edit": "Modifier le script",
      "tag": "Situation",
      "name": "Titre",
      "namePh": "par exemple \"Écouter les explications sur mes médicaments à l'hôpital\"",
      "body": "Script",
      "bodyPh": "Ce que je dis et ce que je fais, dans l'ordre.\npar exemple \"1. Dire mon nom 2. Dire une seule demande 3. Si je ne comprends pas, dire : Encore une fois, s'il vous plaît\"",
      "show": "Afficher en grand",
      "empty": "Pas encore de script. Commencez par \"Écrire un nouveau script\".",
      "needName": "Veuillez écrire un titre"
    },
    "precheck": {
      "title": "Vérification avant de parler",
      "hint": "Écrivez ce que vous allez dire, puis répondez aux 4 questions dans l'ordre. Les réponses sont là pour vous, pour les relire plus tard. Les enregistrer est facultatif.",
      "say": "Ce que je vais dire",
      "sayPh": "par exemple \"Pouvez-vous me remplacer pour mon tour de la semaine prochaine ?\"",
      "q": [
        "Qui est l'autre personne ?",
        "Où cela se passe-t-il ?",
        "Quand ? (Est-ce un moment chargé pour l'autre ?)",
        "Que peut ressentir l'autre en l'entendant ?"
      ],
      "qPh": [
        "par exemple \"Tanaka (nom fictif), de mon équipe\"",
        "par exemple \"la salle de pause\"",
        "par exemple \"vers la fin de la pause de midi\"",
        "par exemple \"dit sans prévenir, ça peut mettre l'autre dans l'embarras\""
      ],
      "qHint": [
        "Si vous ne connaissez pas le nom, le rôle suffit (responsable, professeur, personne à l'accueil).",
        "Notez aussi si d'autres personnes sont autour ou si vous êtes seulement à deux : ce sera plus facile à relire.",
        "Demandez-vous si c'est un moment où l'autre peut s'interrompre.",
        "Pas besoin de certitude. Écrivez-le avec un \"peut-être\"."
      ],
      "step": "{n} / 4",
      "start": "Commencer la vérification",
      "review": "Relire",
      "reviewTitle": "Relecture",
      "reviewHint": "Relisez les 4 réponses et voyez si vous voulez changer la façon de dire ou le moment. Ne rien changer, c'est bien aussi.",
      "redo": "Recommencer",
      "saveIt": "Enregistrer",
      "noSave": "Terminer sans enregistrer",
      "saved": "Enregistré. Vous pourrez le relire dans \"Situations\", sous \"Vérification avant de parler\".",
      "history": "Vérifications enregistrées (30 au maximum)",
      "needSay": "Veuillez écrire ce que vous allez dire",
      "unanswered": "(pas encore écrit)",
      "quote": "« {s} »"
    },
    "after": {
      "title": "Écrire après coup (ce qui n'a pas marché, et la suite)",
      "hint": "Notez ce qui n'a pas bien marché, en 4 étapes, sans vous faire de reproches. Vous pourrez le relire plus tard grâce à l'étiquette de situation.",
      "add": "Écrire une nouvelle note",
      "edit": "Modifier",
      "tag": "Situation",
      "f": [
        "Ce qui s'est passé",
        "Ce que j'ai remarqué après",
        "À essayer la prochaine fois",
        "Ce que je peux demander"
      ],
      "fPh": [
        "par exemple \"J'ai cru que 'nous allons y réfléchir' était sérieux, et j'ai attendu\"",
        "par exemple \"C'était peut-être une façon de dire non\"",
        "par exemple \"La prochaine fois, demander : Vers quand puis-je avoir une réponse ?\"",
        "par exemple \"Demander à ma famille ce qu'elle pense de cette réponse\""
      ],
      "fHint": [
        "Notez seulement ce qui s'est passé. Pas besoin de dire si c'était bien ou mal.",
        "Notez ce que vous avez compris avec le temps.",
        "Une petite chose suffit. Une seule.",
        "S'il y a quelque chose que vous pouvez demander à quelqu'un. Sinon, vous pouvez laisser vide."
      ],
      "show": "Afficher en grand",
      "empty": "Rien pour l'instant. Quand quelque chose ne marche pas bien, vous pouvez le noter ici.",
      "needWhat": "Veuillez remplir \"Ce qui s'est passé\"",
      "none": "(rien)",
      "exportHint": "Si vous exportez, masquez les noms des autres personnes, les noms d'entreprise, etc."
    },
    "call": {
      "title": "Au téléphone",
      "hint": "Pendant l'appel, remplissez les 4 champs. Les chiffres s'affichent en grand. Seuls les 5 derniers appels sont gardés.",
      "f": [
        "Qui appelle",
        "Objet",
        "Pour quand",
        "Pour rappeler"
      ],
      "fPh": [
        "entreprise, nom",
        "en quelques mots",
        "date, heure",
        "numéro, nom"
      ],
      "save": "Garder cet appel",
      "clear": "Vider les champs",
      "clearConfirm": "Voulez-vous vraiment vider les champs ?",
      "show": "Afficher en grand",
      "recent": "Appels récents (5 au maximum)",
      "empty": "Rien pour l'instant.",
      "needAny": "Veuillez remplir au moins un champ",
      "askBack": "Phrases pour faire répéter",
      "askPhrases": [
        "Pouvez-vous répéter plus lentement, s'il vous plaît ?",
        "Pourriez-vous me l'envoyer par écrit ?",
        "Je vous rappellerai, puis-je avoir votre numéro ?",
        "Je vérifie et je vous rappelle"
      ]
    }
  }
});
/* ---- /fr ---- */
/* ---- es: 翻訳 ---- */
TBL.es = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Guía de situaciones - SOYOGI",
    "short": "Guía de situaciones",
    "tagline": "Una guía propia para consultar antes de entrar en una situación."
  },
  "nav": {
    "home": "Inicio",
    "bamen": "Situaciones",
    "after": "Después",
    "call": "Al teléfono",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Borrar",
    "back": "Volver",
    "close": "Cerrar",
    "yes": "Sí",
    "no": "No",
    "add": "Agregar",
    "edit": "Editar",
    "next": "Siguiente",
    "prev": "Anterior",
    "done": "Listo",
    "saved": "Guardado ✓",
    "saveFail": "No se pudo guardar",
    "storageFull": "No queda espacio, no se pudo guardar",
    "deleted": "Borrado",
    "delConfirm": "¿Borrar de verdad?",
    "empty": "Todavía no hay nada",
    "backConfirm": "Lo escrito aún no está guardado. ¿Descartarlo y volver?",
    "optional": "No hace falta completarlo todo.",
    "today": "Hoy",
    "tags": {
      "all": "Todas",
      "work": "Trabajo",
      "school": "Escuela",
      "hospital": "Hospital",
      "shop": "Tienda",
      "family": "Familia",
      "phone": "Teléfono",
      "rule": "Mis reglas"
    },
    "tagLabel": "Situación",
    "emptyTag": "Todavía no hay nada en «{t}».",
    "exp": {
      "btn": "Exportar como texto",
      "hint": "Antes de copiar, conviene ocultar aquí los nombres de otras personas, de empresas y los números de teléfono. Lo que se cambie aquí no modifica lo guardado.",
      "copy": "Copiar",
      "copied": "Copiado ✓",
      "copyFail": "No se pudo copiar. Se puede seleccionar el texto y copiarlo a mano."
    },
    "photo": {
      "camera": "Tomar una foto",
      "roll": "Elegir de las fotos",
      "cropTitle": "Recortar la foto",
      "cropHint": "Mover con el dedo o con las flechas, y cambiar el tamaño con el control deslizante.",
      "zoom": "Tamaño",
      "panUp": "Arriba",
      "panDown": "Abajo",
      "panLeft": "Izquierda",
      "panRight": "Derecha",
      "make": "Usar esta",
      "fail": "No se pudo cargar la foto"
    }
  },
  "set": {
    "hNormal": "Ajustes habituales",
    "hBackup": "Cambio de teléfono (copia de seguridad)",
    "fs": "Tamaño del texto",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muy grande"
    ],
    "lang": "ことば / Language",
    "theme": "Color",
    "themes": [
      "Verde",
      "Azul claro",
      "Blanco",
      "Negro"
    ],
    "bgm": "Música de fondo",
    "bgms": [
      "Ninguna",
      "Sonido verde",
      "Sonido azul"
    ],
    "sound": "Sonido al tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Al cambiar a un teléfono nuevo, tocar «Exportar» para guardar un archivo y, en el teléfono nuevo, tocar «Importar».",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "No se pudo importar",
    "importConfirm": "Lo guardado ahora se sustituirá por el contenido del archivo. ¿Importar?",
    "note": "Todo lo que se escribe se guarda solo en este dispositivo. No se envía a ninguna parte.",
    "privacy": "Política de privacidad",
    "credit": "Desarrollo de la aplicación: SOYOGI, espacio de consulta sobre cuidados y apoyo"
  },
  "guide": {
    "title": "Cómo usar",
    "step": "{n} / {m}",
    "start": "Empezar",
    "again": "Ver de nuevo",
    "heads": [
      "Qué es Guía de situaciones",
      "El inicio y las pestañas de abajo",
      "Diccionario de expresiones",
      "Mis guiones",
      "Revisión antes de hablar",
      "Escribir después",
      "Al teléfono",
      "Solo en este dispositivo"
    ],
    "bodies": [
      "Una guía propia para consultar antes de entrar en una situación y para escribir después, cuando algo no salió bien.\nEs una herramienta para quien suele tomar las palabras al pie de la letra, o para quien prefiere prepararse a solas sin ensayar delante de nadie.\nAquí nada culpa ni juzga lo que está bien o mal. No hace falta configurar nada al principio.",
      "En «Inicio», «Elegir una situación» sirve para antes de entrar en una situación. Ahí están «Diccionario de expresiones», «Mis guiones» y «Revisión antes de hablar».\n«Escribir después» sirve para cuando algo no salió bien, y «Al teléfono», para tomar notas durante una llamada.\nLas pestañas de abajo «Situaciones», «Después» y «Al teléfono» abren las mismas pantallas.",
      "Aquí se pueden consultar expresiones que se oyen a menudo (solo en japonés), escribiendo en «Buscar por palabra» o con los botones de situación.\nAl tocar una expresión aparecen «Sentido literal», «Sentidos habituales (posibles)» y «Una frase para confirmar».\nEl sentido cambia según la persona y el momento. Ante la duda, lo mejor es preguntar para confirmar.\n«Escribir un guion para esta expresión» empieza un guion directamente.",
      "Por situación, se anota lo que decir y lo que hacer. Las reglas propias se guardan en «Mis reglas».\nTocar «Escribir uno nuevo», rellenar la situación, el título y el guion, y tocar «Guardar».\nAl abrir un guion guardado y tocar «Ver en grande», se puede leer con letra grande en el momento.",
      "Escribir lo que se va a decir y tocar «Empezar la revisión».\nCon «Siguiente», responder en orden a 4 preguntas: con quién, dónde, cuándo y cómo puede sentirse la otra persona. No hace falta acertar.\nCon «Repasar» se ven juntas las 4 respuestas. Después, elegir «Guardar esta revisión» o «Terminar sin guardar».",
      "Guardar lo que no salió bien en 4 partes, sin culpas: «Qué pasó», «Qué se notó después», «Qué probar la próxima vez» y «Qué se puede pedir a otras personas».\nTocar «Escribir uno nuevo», elegir la situación, escribir y tocar «Guardar». Más tarde se puede volver a leer por situación.\nCon «Exportar como texto», debajo de una lista, se puede copiar como texto. Antes, conviene ocultar los nombres de otras personas y de empresas.",
      "Mientras se escucha la llamada, escribir en los 4 campos: «De quién», «Asunto», «Para cuándo» y «Devolver la llamada a». Lo escrito se mantiene aunque se vaya a otra pantalla.\n«Ver en grande» lo muestra con letra grande, y «Guardar esta llamada» lo deja en «Llamadas recientes» (hasta 5).\n«Vaciar los campos» solo vacía los campos después de tocar también «Sí».\nAl tocar una de las «Frases para pedir que repitan», aparece con letra grande.",
      "Todo lo que se escribe se guarda solo en este dispositivo y no se envía a ninguna parte.\nAl cambiar a un teléfono nuevo, tocar «Exportar» en «Ajustes» para guardar un archivo y, en el teléfono nuevo, tocar «Importar».\nCon «Tamaño del texto» y «Color» en «Ajustes», la pantalla se ve mejor. El idioma se elige arriba del todo, en «Language».\nEsta guía se puede volver a ver en «Ajustes», con «Ver de nuevo» en la fila «Cómo usar»."
    ]
  },
  "screen": {
    "home": {
      "title": "Guía de situaciones",
      "bamen": "Elegir una situación",
      "bamenSub": "Diccionario, guiones, revisión antes de hablar",
      "after": "Escribir después",
      "afterSub": "Qué pasó → qué probar la próxima vez",
      "call": "Al teléfono",
      "callSub": "De quién, asunto, para cuándo, devolver la llamada",
      "note": "Lo que se escribe aquí queda solo en este dispositivo."
    },
    "bamen": {
      "title": "Elegir una situación",
      "hint": "Antes de entrar en la situación, elegir una opción.",
      "dict": "Diccionario de expresiones",
      "dictSub": "Sentido literal / sentidos habituales / cómo confirmar",
      "dictJaOnly": "(solo en japonés)",
      "script": "Mis guiones",
      "scriptSub": "Ir anotando por situación (aquí también están «Mis reglas»)",
      "precheck": "Revisión antes de hablar",
      "precheckSub": "Con quién, dónde, cuándo y cómo puede sentirse la otra persona"
    },
    "dict": {
      "title": "Diccionario de expresiones",
      "search": "Buscar por palabra",
      "searchPh": "Por ejemplo: 検討, また",
      "count": "{n} expresiones",
      "lit": "Sentido literal",
      "maybe": "Sentidos habituales (posibles)",
      "ask": "Una frase para confirmar",
      "caution": "El sentido cambia según la persona y el momento. Aquí solo hay «posibles sentidos habituales». Ante la duda, lo mejor es preguntar para confirmar.",
      "jaOnly": "Este diccionario está solo en japonés.",
      "noHit": "No se encontró nada. Se puede probar con otra palabra.",
      "toScript": "Escribir un guion para esta expresión",
      "draftTitle": "Cuando me dicen «{w}»"
    },
    "script": {
      "title": "Mis guiones",
      "hint": "Aquí se anota, por situación, lo que decir y lo que hacer. «Mis reglas» es el lugar para guardar las reglas propias.",
      "add": "Escribir uno nuevo",
      "edit": "Editar el guion",
      "tag": "Situación",
      "name": "Título",
      "namePh": "Por ejemplo: «Al escuchar en el hospital la explicación de un medicamento»",
      "body": "Guion",
      "bodyPh": "Lo que decir y hacer, en orden.\nPor ejemplo: «1. Decir mi nombre 2. Decir un solo asunto 3. Si no entiendo, decir \"Una vez más, por favor\"»",
      "show": "Ver en grande",
      "empty": "Todavía no hay guiones. Se puede empezar con «Escribir uno nuevo».",
      "needName": "Falta escribir el título"
    },
    "precheck": {
      "title": "Revisión antes de hablar",
      "hint": "Escribir lo que se va a decir y responder, en orden, 4 preguntas. Las respuestas son para volver a leerlas después; guardarlas es opcional.",
      "say": "Lo que se va a decir",
      "sayPh": "Por ejemplo: «Quisiera que alguien me cubra el turno de la próxima semana»",
      "q": [
        "¿Quién es la otra persona?",
        "¿En qué lugar?",
        "¿Cuándo? (¿La otra persona está ocupada en ese momento?)",
        "¿Cómo podría sentirse la otra persona al oírlo?"
      ],
      "qPh": [
        "Por ejemplo: «Tanaka (nombre de ejemplo), del mismo equipo»",
        "Por ejemplo: «la sala de descanso»",
        "Por ejemplo: «hacia el final de la pausa del almuerzo»",
        "Por ejemplo: «quizá le resulte difícil si se lo digo de repente»"
      ],
      "qHint": [
        "Si no se sabe el nombre, basta con el papel que tiene (superior, docente, recepcionista).",
        "Anotar si hay gente alrededor o si serán solo dos personas ayuda a repasarlo después.",
        "Pensar si la otra persona puede dejar lo que está haciendo en ese momento.",
        "No hace falta darlo por hecho. Basta con escribirlo como «quizá»."
      ],
      "step": "{n} / 4",
      "start": "Empezar la revisión",
      "review": "Repasar",
      "reviewTitle": "Repaso",
      "reviewHint": "Leer las 4 respuestas y pensar si cambiar la forma de decirlo o el momento. No cambiar nada también está bien.",
      "redo": "Hacerlo otra vez",
      "saveIt": "Guardar esta revisión",
      "noSave": "Terminar sin guardar",
      "saved": "Guardada. Se puede repasar desde «Revisión antes de hablar», en «Situaciones».",
      "history": "Revisiones guardadas (hasta 30)",
      "needSay": "Falta escribir lo que se va a decir",
      "unanswered": "(todavía sin escribir)",
      "quote": "«{s}»"
    },
    "after": {
      "title": "Escribir después (lo que no salió bien y lo siguiente)",
      "hint": "Guardar lo que no salió bien en 4 partes, sin culpas. Con la etiqueta de situación se puede volver a leer más tarde.",
      "add": "Escribir uno nuevo",
      "edit": "Editar",
      "tag": "Situación",
      "f": [
        "Qué pasó",
        "Qué se notó después",
        "Qué probar la próxima vez",
        "Qué se puede pedir a otras personas"
      ],
      "fPh": [
        "Por ejemplo: «Creí que \"lo vamos a estudiar\" iba en serio y me quedé esperando»",
        "Por ejemplo: «Quizá era una forma de decir que no»",
        "Por ejemplo: «La próxima vez, preguntar \"¿Para cuándo más o menos podría tener una respuesta?\"»",
        "Por ejemplo: «Preguntar a alguien de la familia qué opina de esta respuesta»"
      ],
      "fHint": [
        "Escribir solo lo que pasó. No hace falta decir si estuvo bien o mal.",
        "Escribir lo que se entendió después de un tiempo.",
        "Algo pequeño está bien. Solo una cosa.",
        "Si hay algo que se pueda pedir a otra persona. Si no, se puede dejar en blanco."
      ],
      "show": "Ver en grande",
      "empty": "Todavía no hay nada. Cuando algo no salga bien, se puede guardar aquí.",
      "needWhat": "Falta escribir «Qué pasó»",
      "none": "(nada)",
      "exportHint": "Al exportar, conviene ocultar los nombres de otras personas, de empresas y datos parecidos."
    },
    "call": {
      "title": "Al teléfono",
      "hint": "Completar los 4 campos mientras se escucha la llamada. Los números se muestran en grande. Solo se guardan las 5 llamadas más recientes.",
      "f": [
        "De quién",
        "Asunto",
        "Para cuándo",
        "Devolver la llamada a"
      ],
      "fPh": [
        "empresa, nombre",
        "en pocas palabras",
        "fecha, hora",
        "número de teléfono, nombre"
      ],
      "save": "Guardar esta llamada",
      "clear": "Vaciar los campos",
      "clearConfirm": "¿Vaciar los campos de verdad?",
      "show": "Ver en grande",
      "recent": "Llamadas recientes (hasta 5)",
      "empty": "Todavía no hay nada.",
      "needAny": "Hay que completar al menos un campo",
      "askBack": "Frases para pedir que repitan",
      "askPhrases": [
        "Otra vez más despacio, por favor",
        "¿Sería posible enviarlo por escrito?",
        "Para devolver la llamada, ¿a qué número llamo?",
        "Lo compruebo y vuelvo a llamar"
      ]
    }
  }
});
/* ---- /es ---- */
/* ---- it: 翻訳 ---- */
TBL.it = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Guida alle situazioni - SOYOGI",
    "short": "Guida alle situazioni",
    "tagline": "Una guida personale da consultare prima di entrare in una situazione."
  },
  "nav": {
    "home": "Home",
    "bamen": "Situazioni",
    "after": "Dopo",
    "call": "Al telefono",
    "set": "Opzioni"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annulla",
    "save": "Salva",
    "del": "Elimina",
    "back": "Indietro",
    "close": "Chiudi",
    "yes": "Sì",
    "no": "No",
    "add": "Aggiungi",
    "edit": "Modifica",
    "next": "Avanti",
    "prev": "Prima",
    "done": "Fatto",
    "saved": "Salvato ✓",
    "saveFail": "Non è stato possibile salvare",
    "storageFull": "Memoria piena, non è stato possibile salvare",
    "deleted": "Eliminato",
    "delConfirm": "Eliminare davvero?",
    "empty": "Ancora niente",
    "backConfirm": "Quanto scritto non è ancora salvato. Scartarlo e tornare indietro?",
    "optional": "Non è necessario compilare tutto.",
    "today": "Oggi",
    "tags": {
      "all": "Tutte",
      "work": "Lavoro",
      "school": "Scuola",
      "hospital": "Ospedale",
      "shop": "Negozio",
      "family": "Famiglia",
      "phone": "Telefono",
      "rule": "Le mie regole"
    },
    "tagLabel": "Situazione",
    "emptyTag": "Ancora niente in «{t}».",
    "exp": {
      "btn": "Esporta come testo",
      "hint": "Prima di copiare, nasconda qui i nomi di altre persone, delle aziende e i numeri di telefono. Le modifiche fatte qui non cambiano ciò che ha salvato.",
      "copy": "Copia",
      "copied": "Copiato ✓",
      "copyFail": "Non è stato possibile copiare. Selezioni il testo e lo copi."
    },
    "photo": {
      "camera": "Scattare una foto",
      "roll": "Scegliere dalle foto",
      "cropTitle": "Ritagliare la foto",
      "cropHint": "Sposti la foto con il dito o con le frecce, poi cambi la grandezza con il cursore.",
      "zoom": "Grandezza",
      "panUp": "Su",
      "panDown": "Giù",
      "panLeft": "Sinistra",
      "panRight": "Destra",
      "make": "Va bene così",
      "fail": "Non è stato possibile caricare la foto"
    }
  },
  "set": {
    "hNormal": "Impostazioni di tutti i giorni",
    "hBackup": "Cambio di telefono (backup)",
    "fs": "Grandezza del testo",
    "fsSizes": [
      "Normale",
      "Grande",
      "Molto grande"
    ],
    "lang": "ことば / Language",
    "theme": "Colore",
    "themes": [
      "Verde",
      "Azzurro",
      "Bianco",
      "Nero"
    ],
    "bgm": "Musica",
    "bgms": [
      "Nessuna",
      "Suono verde",
      "Suono blu"
    ],
    "sound": "Suono al tocco",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Quando passa a un nuovo telefono, tocchi «Esporta» per salvare un file, poi sul nuovo telefono tocchi «Importa».",
    "bkExport": "Esporta",
    "bkImport": "Importa",
    "exported": "Esportato ✓",
    "imported": "Importato ✓",
    "importFail": "Non è stato possibile importare",
    "importConfirm": "Ciò che ha salvato ora verrà sostituito dal contenuto del file. Importare?",
    "note": "Tutto ciò che scrive viene salvato solo su questo dispositivo. Non viene inviato da nessuna parte.",
    "privacy": "Informativa sulla privacy",
    "credit": "Sviluppo dell'app: SOYOGI, servizio di consulenza su assistenza e sostegno"
  },
  "guide": {
    "title": "Come si usa",
    "step": "{n} / {m}",
    "start": "Inizia",
    "again": "Rivedi",
    "heads": [
      "Che cos'è Guida alle situazioni",
      "La Home e le schede in basso",
      "Dizionario delle espressioni",
      "I miei copioni",
      "Controllo prima di parlare",
      "Scrivere dopo",
      "Al telefono",
      "Solo su questo dispositivo"
    ],
    "bodies": [
      "Una guida personale: da consultare prima di entrare in una situazione e da compilare dopo, quando qualcosa non è andato bene.\nÈ uno strumento per chi tende a prendere le parole alla lettera, o per chi vuole prepararsi in autonomia senza esercitarsi davanti agli altri.\nQui niente La rimprovera né giudica ciò che è giusto o sbagliato. All'inizio non c'è niente da impostare.",
      "Nella «Home», «Scegliere una situazione» serve prima di entrare in una situazione. Lì trova «Dizionario delle espressioni», «I miei copioni» e «Controllo prima di parlare».\n«Scrivere dopo» serve quando qualcosa non è andato bene, e «Al telefono» per prendere appunti durante una telefonata.\nLe schede in basso «Situazioni», «Dopo» e «Al telefono» aprono le stesse schermate.",
      "Può cercare espressioni che si sentono spesso (solo in giapponese), scrivendo in «Cerca per parola» o con i pulsanti delle situazioni.\nToccando un'espressione compaiono «Significato letterale», «Significati frequenti (possibili)» e «Una frase per chiedere conferma».\nIl significato cambia a seconda della persona e del momento. Nel dubbio, la cosa migliore è chiedere.\n«Scrivere un copione per questa espressione» avvia subito un copione.",
      "Per ogni situazione, annoti ciò che dice e ciò che fa. Le regole che ha deciso Lei vanno in «Le mie regole».\nTocchi «Nuovo copione», compili situazione, titolo e copione, poi tocchi «Salva».\nApra un copione salvato e tocchi «Vedere in grande» per leggerlo a caratteri grandi sul momento.",
      "Scriva ciò che sta per dire e tocchi «Iniziare il controllo».\nCon «Avanti» risponda in ordine a 4 domande: chi, dove, quando e come potrebbe sentirsi l'altra persona. Non serve esserne certi.\nCon «Rileggere» vede insieme le 4 risposte. Poi scelga «Salvare» o «Finire senza salvare».",
      "Annoti in 4 parti, senza colpevolizzarsi, ciò che non è andato bene: «Cosa è successo», «Cosa ho notato dopo», «Cosa provare la prossima volta» e «Cosa posso chiedere agli altri».\nTocchi «Nuova nota», scelga la situazione, scriva e tocchi «Salva». Più tardi potrà rileggere per situazione.\nCon «Esporta come testo», sotto un elenco, può copiare il testo. Prima nasconda i nomi di altre persone e delle aziende.",
      "Mentre ascolta la telefonata, scriva nei 4 campi: «Chi chiama», «Motivo», «Entro quando» e «Richiamare a». Ciò che scrive resta anche se passa a un'altra schermata.\n«Vedere in grande» lo mostra a caratteri grandi, e «Conservare questa telefonata» lo tiene in «Telefonate recenti» (fino a 5).\n«Svuotare i campi» svuota i campi solo dopo che ha toccato anche «Sì».\nToccando una delle «Frasi per chiedere di ripetere», compare a caratteri grandi.",
      "Tutto ciò che scrive viene salvato solo su questo dispositivo e non viene inviato da nessuna parte.\nQuando passa a un nuovo telefono, in «Opzioni» tocchi «Esporta» per salvare un file, poi sul nuovo telefono tocchi «Importa».\nCon «Grandezza del testo» e «Colore» in «Opzioni» lo schermo diventa più leggibile. La lingua si sceglie in alto, con «Language».\nPuò rivedere questa guida in «Opzioni», con «Rivedi» alla voce «Come si usa»."
    ]
  },
  "screen": {
    "home": {
      "title": "Guida alle situazioni",
      "bamen": "Scegliere una situazione",
      "bamenSub": "Dizionario, copioni, controllo prima di parlare",
      "after": "Scrivere dopo",
      "afterSub": "Cosa è successo → cosa provare la prossima volta",
      "call": "Al telefono",
      "callSub": "Chi, motivo, entro quando, da richiamare",
      "note": "Ciò che scrive qui resta solo su questo dispositivo."
    },
    "bamen": {
      "title": "Scegliere una situazione",
      "hint": "Prima di entrare nella situazione, ne scelga una.",
      "dict": "Dizionario delle espressioni",
      "dictSub": "Significato letterale / significati frequenti / come chiedere conferma",
      "dictJaOnly": "(solo in giapponese)",
      "script": "I miei copioni",
      "scriptSub": "Da scrivere per ogni situazione (qui ci sono anche le mie regole)",
      "precheck": "Controllo prima di parlare",
      "precheckSub": "Chi, dove, quando, come potrebbe sentirsi l'altra persona"
    },
    "dict": {
      "title": "Dizionario delle espressioni",
      "search": "Cerca per parola",
      "searchPh": "es. 検討, また",
      "count": "{n} voci",
      "lit": "Significato letterale",
      "maybe": "Significati frequenti (possibili)",
      "ask": "Una frase per chiedere conferma",
      "caution": "Il significato cambia a seconda della persona e del momento. Qui ci sono solo i significati possibili più comuni. Nel dubbio, la cosa migliore è chiedere per esserne sicuri.",
      "jaOnly": "Questo dizionario è solo in giapponese.",
      "noHit": "Nessun risultato. Provi a cercare con un'altra parola.",
      "toScript": "Scrivere un copione per questa espressione",
      "draftTitle": "Quando mi dicono «{w}»"
    },
    "script": {
      "title": "I miei copioni",
      "hint": "Per ogni situazione, può raccogliere ciò che dice e ciò che fa. «Le mie regole» è il posto dove tenere le regole che ha deciso Lei.",
      "add": "Nuovo copione",
      "edit": "Modifica del copione",
      "tag": "Situazione",
      "name": "Titolo",
      "namePh": "es. «Quando in ospedale mi spiegano i farmaci»",
      "body": "Copione",
      "bodyPh": "Ciò che dirà e farà, in ordine.\nes. «1. Dire il proprio nome 2. Dire un solo motivo 3. Se non capisco:“Può ripetere, per favore?”»",
      "show": "Vedere in grande",
      "empty": "Ancora nessun copione. Può iniziare da «Nuovo copione».",
      "needName": "Scriva un titolo, per favore."
    },
    "precheck": {
      "title": "Controllo prima di parlare",
      "hint": "Scriva ciò che sta per dire, poi risponda in ordine a 4 domande. Le risposte servono a Lei per rileggerle. Salvarle è facoltativo.",
      "say": "Ciò che sto per dire",
      "sayPh": "es. «Può sostituirmi nel turno della prossima settimana?»",
      "q": [
        "Chi è l'altra persona?",
        "In che luogo?",
        "Quando? (L'altra persona è occupata in quel momento?)",
        "Come potrebbe sentirsi l'altra persona ascoltandolo?"
      ],
      "qPh": [
        "es. «Tanaka (nome di esempio), del mio stesso gruppo»",
        "es. «la sala pausa»",
        "es. «verso la fine della pausa pranzo»",
        "es. «potrebbe trovarsi in difficoltà se glielo dico all'improvviso»"
      ],
      "qHint": [
        "Se non conosce il nome, va bene anche il ruolo (responsabile, insegnante, persona all'accoglienza).",
        "Se annota anche se ci sono altre persone intorno o solo voi due, sarà più facile rileggere.",
        "Pensi se l'altra persona può interrompere ciò che sta facendo in quel momento.",
        "Non serve dare nulla per certo. Può scriverlo con un «forse»."
      ],
      "step": "{n} / 4",
      "start": "Iniziare il controllo",
      "review": "Rileggere",
      "reviewTitle": "Rilettura",
      "reviewHint": "Guardi le 4 risposte e pensi se cambiare il modo di dirlo o il momento. Va bene anche non cambiare nulla.",
      "redo": "Rifare",
      "saveIt": "Salvare",
      "noSave": "Finire senza salvare",
      "saved": "Salvato. Può rileggerlo da «Controllo prima di parlare» in «Situazioni».",
      "history": "Controlli salvati (fino a 30)",
      "needSay": "Scriva ciò che vuole dire, per favore.",
      "unanswered": "(non ancora scritto)",
      "quote": "«{s}»"
    },
    "after": {
      "title": "Scrivere dopo (errori e prossima volta)",
      "hint": "Annoti in 4 parti, senza colpevolizzarsi, ciò che non è andato bene. Potrà rileggerlo in seguito con l'etichetta della situazione.",
      "add": "Nuova nota",
      "edit": "Modifica",
      "tag": "Situazione",
      "f": [
        "Cosa è successo",
        "Cosa ho notato dopo",
        "Cosa provare la prossima volta",
        "Cosa posso chiedere agli altri"
      ],
      "fPh": [
        "es. «Ho preso sul serio “Ci penseremo” e ho aspettato»",
        "es. «Forse era un modo per dire di no»",
        "es. «La prossima volta chiedere “Più o meno quando potrò avere una risposta?”»",
        "es. «Chiedere a un familiare “Cosa ne pensi di questa risposta?”»"
      ],
      "fHint": [
        "Scriva solo ciò che è successo. Non serve dire se è stato giusto o sbagliato.",
        "Scriva ciò che ha capito dopo un po' di tempo.",
        "Va bene anche una cosa piccola. Una sola.",
        "Se c'è qualcosa che può chiedere a qualcuno. Se no, va bene lasciarlo vuoto."
      ],
      "show": "Vedere in grande",
      "empty": "Ancora niente. Quando qualcosa non va bene, può annotarlo qui.",
      "needWhat": "Scriva «Cosa è successo», per favore.",
      "none": "(niente)",
      "exportHint": "Quando esporta, nasconda i nomi di altre persone, delle aziende e simili."
    },
    "call": {
      "title": "Al telefono",
      "hint": "Compili i 4 campi mentre ascolta la telefonata. I numeri appaiono in grande. Vengono conservate solo le ultime 5.",
      "f": [
        "Chi chiama",
        "Motivo",
        "Entro quando",
        "Richiamare a"
      ],
      "fPh": [
        "azienda, nome",
        "in poche parole",
        "giorno, ora",
        "numero di telefono, nome"
      ],
      "save": "Conservare questa telefonata",
      "clear": "Svuotare i campi",
      "clearConfirm": "Svuotare davvero i campi?",
      "show": "Vedere in grande",
      "recent": "Telefonate recenti (fino a 5)",
      "empty": "Ancora niente.",
      "needAny": "Compili almeno un campo, per favore.",
      "askBack": "Frasi per chiedere di ripetere",
      "askPhrases": [
        "Può ripetere lentamente, per favore?",
        "Può inviarmelo per iscritto?",
        "La richiamo io: mi può dare il suo numero di telefono, per favore?",
        "Verifico e la richiamo."
      ]
    }
  }
});
/* ---- /it ---- */
/* ---- pt: 翻訳 ---- */
TBL.pt = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Guia de situações - SOYOGI",
    "short": "Guia de situações",
    "tagline": "Um guia feito para si mesmo, para abrir antes de entrar numa situação."
  },
  "nav": {
    "home": "Início",
    "bamen": "Situações",
    "after": "Depois",
    "call": "Ao telefone",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Apagar",
    "back": "Voltar",
    "close": "Fechar",
    "yes": "Sim",
    "no": "Não",
    "add": "Adicionar",
    "edit": "Editar",
    "next": "Seguinte",
    "prev": "Anterior",
    "done": "Concluído",
    "saved": "Guardado ✓",
    "saveFail": "Não foi possível guardar",
    "storageFull": "Memória cheia, não foi possível guardar",
    "deleted": "Apagado",
    "delConfirm": "Apagar mesmo?",
    "empty": "Ainda não há nada",
    "backConfirm": "O que escreveu ainda não foi guardado. Descartar e voltar?",
    "optional": "Não é preciso preencher tudo.",
    "today": "Hoje",
    "tags": {
      "all": "Todas",
      "work": "Trabalho",
      "school": "Escola",
      "hospital": "Hospital",
      "shop": "Loja",
      "family": "Família",
      "phone": "Telefone",
      "rule": "Minhas regras"
    },
    "tagLabel": "Situação",
    "emptyTag": "Ainda não há nada em \"{t}\".",
    "exp": {
      "btn": "Exportar como texto",
      "hint": "Antes de copiar, ocultar aqui nomes de outras pessoas, de empresas e números de telefone. O que for alterado aqui não muda o que foi guardado.",
      "copy": "Copiar",
      "copied": "Copiado ✓",
      "copyFail": "Não foi possível copiar. É possível selecionar o texto e copiá-lo."
    },
    "photo": {
      "camera": "Tirar uma foto",
      "roll": "Escolher entre as fotos",
      "cropTitle": "Recortar a foto",
      "cropHint": "Mover com o dedo ou com as setas e mudar o tamanho com a barra deslizante.",
      "zoom": "Tamanho",
      "panUp": "Para cima",
      "panDown": "Para baixo",
      "panLeft": "Para a esquerda",
      "panRight": "Para a direita",
      "make": "Usar esta",
      "fail": "Não foi possível carregar a foto"
    }
  },
  "set": {
    "hNormal": "Ajustes gerais",
    "hBackup": "Mudar de telefone (cópia de segurança)",
    "fs": "Tamanho do texto",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muito grande"
    ],
    "lang": "ことば / Language",
    "theme": "Cor",
    "themes": [
      "Verde",
      "Azul-claro",
      "Branco",
      "Preto"
    ],
    "bgm": "Música",
    "bgms": [
      "Nenhuma",
      "Som verde",
      "Som azul"
    ],
    "sound": "Som ao tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Ao mudar para um telefone novo, tocar em \"Exportar\" para guardar os dados e, depois, tocar em \"Importar\" no telefone novo.",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "Não foi possível importar",
    "importConfirm": "O conteúdo atual será substituído pelo conteúdo importado. Importar?",
    "note": "Tudo o que for escrito fica guardado apenas neste dispositivo. Nada é enviado para nenhum lugar.",
    "privacy": "Política de privacidade",
    "credit": "Desenvolvido por SOYOGI, espaço de aconselhamento sobre cuidados e apoio"
  },
  "guide": {
    "title": "Como usar",
    "step": "{n} / {m}",
    "start": "Começar",
    "again": "Ver de novo",
    "heads": [
      "O que é o Guia de situações",
      "O início e as abas de baixo",
      "Dicionário de expressões",
      "Meus roteiros",
      "Verificação antes de falar",
      "Escrever depois",
      "Ao telefone",
      "Só neste dispositivo"
    ],
    "bodies": [
      "Um guia feito para si mesmo: para abrir antes de entrar numa situação e para escrever depois, quando algo não correu bem.\nÉ uma ferramenta para quem costuma entender as palavras ao pé da letra, ou para quem prefere preparar-se sozinho, sem ensaiar na frente dos outros.\nAqui nada culpa nem julga o que é certo ou errado. Não é preciso configurar nada no começo.",
      "Em \"Início\", \"Escolher uma situação\" serve para antes de entrar numa situação. Ali estão \"Dicionário de expressões\", \"Meus roteiros\" e \"Verificação antes de falar\".\n\"Escrever depois\" serve para quando algo não correu bem, e \"Ao telefone\", para anotar durante uma chamada.\nAs abas de baixo \"Situações\", \"Depois\" e \"Ao telefone\" abrem as mesmas páginas.",
      "Aqui é possível procurar expressões que se ouvem com frequência (apenas em japonês), escrevendo em \"Procurar por palavra\" ou com os botões de situação.\nAo tocar numa expressão, aparecem \"Sentido literal\", \"Sentidos prováveis (possibilidades)\" e \"Uma frase para confirmar\".\nO sentido muda conforme a pessoa e o momento. Na dúvida, o melhor é perguntar e confirmar.\n\"Escrever um roteiro para esta expressão\" começa logo um roteiro.",
      "Por situação, ir anotando o que dizer e o que fazer. As regras que cada um cria para si ficam em \"Minhas regras\".\nTocar em \"Escrever um novo\", preencher a situação, o título e o roteiro, e tocar em \"Guardar\".\nAo abrir um roteiro guardado e tocar em \"Ver ampliado\", é possível lê-lo em letra grande na hora.",
      "Escrever o que se vai dizer e tocar em \"Começar a verificação\".\nCom \"Seguinte\", responder por ordem às 4 perguntas: quem, onde, quando e o que a outra pessoa pode sentir. Não é preciso ter certeza.\nCom \"Rever\", as 4 respostas aparecem juntas. Depois, escolher \"Guardar\" ou \"Terminar sem guardar\".",
      "Anotar o que não funcionou em 4 partes, sem culpas: \"O que aconteceu\", \"O que percebi depois\", \"O que tentar a seguir\" e \"O que posso pedir\".\nTocar em \"Escrever uma nova\", escolher a situação, escrever e tocar em \"Guardar\". Depois, é possível reler por situação.\nCom \"Exportar como texto\", debaixo de uma lista, é possível copiar o texto. Antes, ocultar nomes de outras pessoas e de empresas.",
      "Durante a chamada, escrever nos 4 campos: \"Quem ligou\", \"Assunto\", \"Até quando\" e \"Ligar de volta para\". O que se escreve fica guardado mesmo ao ir para outra página.\n\"Ver ampliado\" mostra em letra grande, e \"Guardar esta chamada\" deixa em \"Chamadas recentes\" (até 5).\n\"Limpar os campos\" só limpa depois de tocar também em \"Sim\".\nAo tocar numa das \"Frases para pedir que repitam\", ela aparece em letra grande.",
      "Tudo o que for escrito fica guardado apenas neste dispositivo e não é enviado para nenhum lugar.\nAo mudar para um telefone novo, tocar em \"Exportar\" em \"Ajustes\" para guardar os dados e, depois, tocar em \"Importar\" no telefone novo.\nCom \"Tamanho do texto\" e \"Cor\" em \"Ajustes\", fica mais fácil de ler. O idioma é escolhido bem no alto, em \"Language\".\nEste guia pode ser visto de novo em \"Ajustes\", com \"Ver de novo\" na linha \"Como usar\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Guia de situações",
      "bamen": "Escolher uma situação",
      "bamenSub": "Dicionário, roteiros, verificação antes de falar",
      "after": "Escrever depois",
      "afterSub": "O que aconteceu → o que tentar a seguir",
      "call": "Ao telefone",
      "callSub": "Quem ligou, assunto, até quando, ligar de volta",
      "note": "O que for escrito aqui fica apenas neste dispositivo."
    },
    "bamen": {
      "title": "Escolher uma situação",
      "hint": "Antes de entrar na situação, escolher uma das opções.",
      "dict": "Dicionário de expressões",
      "dictSub": "Sentido literal / sentidos prováveis / como confirmar",
      "dictJaOnly": "(apenas em japonês)",
      "script": "Meus roteiros",
      "scriptSub": "Escrever aos poucos, por situação (\"Minhas regras\" também está aqui)",
      "precheck": "Verificação antes de falar",
      "precheckSub": "Quem, onde, quando, o que a outra pessoa pode sentir"
    },
    "dict": {
      "title": "Dicionário de expressões",
      "search": "Procurar por palavra",
      "searchPh": "por exemplo 検討 ou また",
      "count": "{n} expressões",
      "lit": "Sentido literal",
      "maybe": "Sentidos prováveis (possibilidades)",
      "ask": "Uma frase para confirmar",
      "caution": "O sentido muda conforme a pessoa e o momento. O que está aqui são apenas \"possibilidades comuns\". Na dúvida, o melhor é perguntar e confirmar.",
      "jaOnly": "Este dicionário existe apenas em japonês.",
      "noHit": "Nada encontrado. Tentar com outra palavra.",
      "toScript": "Escrever um roteiro para esta expressão",
      "draftTitle": "Quando me dizem \"{w}\""
    },
    "script": {
      "title": "Meus roteiros",
      "hint": "Por situação, ir anotando o que dizer e o que fazer. \"Minhas regras\" é o lugar para juntar as regras que cada um cria para si.",
      "add": "Escrever um novo",
      "edit": "Editar roteiro",
      "tag": "Situação",
      "name": "Título",
      "namePh": "por exemplo \"Ao ouvir a explicação dos medicamentos no hospital\"",
      "body": "Roteiro",
      "bodyPh": "O que dizer e fazer, passo a passo.\npor exemplo: 1. Dizer o nome 2. Dizer um só assunto 3. Se não entender, dizer \"Mais uma vez, por favor\"",
      "show": "Ver ampliado",
      "empty": "Ainda não há roteiros. É possível começar em \"Escrever um novo\".",
      "needName": "É preciso escrever um título"
    },
    "precheck": {
      "title": "Verificação antes de falar",
      "hint": "Escrever o que se vai dizer e responder às 4 perguntas, uma de cada vez. As respostas servem apenas para consulta pessoal. Guardar é opcional.",
      "say": "O que vou dizer",
      "sayPh": "por exemplo \"Pedir uma troca de turno na próxima semana\"",
      "q": [
        "Quem é a outra pessoa?",
        "Em que lugar?",
        "Quando vai ser? (A outra pessoa está ocupada nessa hora?)",
        "O que a outra pessoa pode sentir ao ouvir isso?"
      ],
      "qPh": [
        "por exemplo \"Tanaka (nome fictício), do mesmo grupo\"",
        "por exemplo \"a sala de descanso\"",
        "por exemplo \"no fim do intervalo do almoço\"",
        "por exemplo \"pode ser difícil para a pessoa ouvir isso de repente\""
      ],
      "qHint": [
        "Sem saber o nome, basta indicar a função (chefe, professor, pessoa do atendimento).",
        "Anotar também se há outras pessoas por perto ou se são só duas pessoas: assim fica mais fácil rever.",
        "Pensar se é uma hora em que a outra pessoa pode fazer uma pausa.",
        "Não é preciso tirar conclusões. Escrever com um \"talvez\"."
      ],
      "step": "{n} / 4",
      "start": "Começar a verificação",
      "review": "Rever",
      "reviewTitle": "Revisão",
      "reviewHint": "Ler as 4 respostas e pensar se vale mudar a forma de dizer ou o momento. Não mudar nada também está bem.",
      "redo": "Fazer de novo",
      "saveIt": "Guardar",
      "noSave": "Terminar sem guardar",
      "saved": "Guardado. É possível rever em \"Situações\", em \"Verificação antes de falar\".",
      "history": "Verificações guardadas (até 30)",
      "needSay": "É preciso preencher \"O que vou dizer\"",
      "unanswered": "(ainda não escrito)",
      "quote": "\"{s}\""
    },
    "after": {
      "title": "Escrever depois (tropeços e próximo passo)",
      "hint": "Anotar o que não funcionou em 4 partes, sem culpas. Depois, é possível reler por situação.",
      "add": "Escrever uma nova",
      "edit": "Editar",
      "tag": "Situação",
      "f": [
        "O que aconteceu",
        "O que percebi depois",
        "O que tentar a seguir",
        "O que posso pedir"
      ],
      "fPh": [
        "por exemplo \"Levei 'vamos pensar no assunto' ao pé da letra e esperei pela resposta\"",
        "por exemplo \"Talvez fosse uma forma de dizer não\"",
        "por exemplo \"Da próxima vez, perguntar: 'Mais ou menos quando posso ter uma resposta?'\"",
        "por exemplo \"Perguntar à família: 'O que acham desta resposta?'\""
      ],
      "fHint": [
        "Escrever só o que aconteceu. Não é preciso julgar se foi bom ou não.",
        "Escrever o que ficou claro com o tempo.",
        "Pode ser algo pequeno. Só uma coisa.",
        "Se houver algo que se possa pedir a alguém. Se não houver, pode ficar em branco."
      ],
      "show": "Ver ampliado",
      "empty": "Ainda não há nada. Quando algo não funcionar, é possível anotar aqui.",
      "needWhat": "É preciso preencher \"O que aconteceu\"",
      "none": "(nada)",
      "exportHint": "Ao exportar, ocultar nomes de outras pessoas, de empresas, etc."
    },
    "call": {
      "title": "Ao telefone",
      "hint": "Durante a chamada, preencher os 4 campos. Os números aparecem em tamanho grande. Só ficam guardadas as 5 chamadas mais recentes.",
      "f": [
        "Quem ligou",
        "Assunto",
        "Até quando",
        "Ligar de volta para"
      ],
      "fPh": [
        "empresa, nome",
        "em poucas palavras",
        "data, hora",
        "número de telefone, nome"
      ],
      "save": "Guardar esta chamada",
      "clear": "Limpar os campos",
      "clearConfirm": "Limpar mesmo os campos?",
      "show": "Ver ampliado",
      "recent": "Chamadas recentes (até 5)",
      "empty": "Ainda não há nada.",
      "needAny": "É preciso preencher pelo menos um campo",
      "askBack": "Frases para pedir que repitam",
      "askPhrases": [
        "Pode repetir mais devagar, por favor?",
        "Poderia enviar isso por escrito?",
        "Vou ligar de volta. Pode dar o número de telefone, por favor?",
        "Vou verificar e ligo de volta"
      ]
    }
  }
});
/* ---- /pt ---- */
/* ---- nl: 翻訳 ---- */
TBL.nl = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Situatiegids - SOYOGI",
    "short": "Situatiegids",
    "tagline": "Een gids voor uzelf, om na te slaan voordat u een situatie ingaat."
  },
  "nav": {
    "home": "Start",
    "bamen": "Situaties",
    "after": "Achteraf",
    "call": "Aan de telefoon",
    "set": "Instellingen"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuleren",
    "save": "Opslaan",
    "del": "Verwijderen",
    "back": "Terug",
    "close": "Sluiten",
    "yes": "Ja",
    "no": "Nee",
    "add": "Toevoegen",
    "edit": "Aanpassen",
    "next": "Volgende",
    "prev": "Vorige",
    "done": "Klaar",
    "saved": "Opgeslagen ✓",
    "saveFail": "Opslaan is niet gelukt",
    "storageFull": "Het geheugen is vol, opslaan is niet gelukt",
    "deleted": "Verwijderd",
    "delConfirm": "Weet u zeker dat u dit wilt verwijderen?",
    "empty": "Hier staat nog niets",
    "backConfirm": "Wat u hebt geschreven, is nog niet opgeslagen. Weggooien en teruggaan?",
    "optional": "U hoeft niet alles in te vullen.",
    "today": "Vandaag",
    "tags": {
      "all": "Alles",
      "work": "Werk",
      "school": "School",
      "hospital": "Ziekenhuis",
      "shop": "Winkel",
      "family": "Gezin",
      "phone": "Telefoon",
      "rule": "Mijn regels"
    },
    "tagLabel": "Situatie",
    "emptyTag": "Nog niets onder \"{t}\".",
    "exp": {
      "btn": "Als tekst exporteren",
      "hint": "Maak hier namen van andere mensen, bedrijfsnamen en telefoonnummers onherkenbaar voordat u kopieert. Wat u hier verandert, verandert niets aan wat u hebt opgeslagen.",
      "copy": "Kopiëren",
      "copied": "Gekopieerd ✓",
      "copyFail": "Kopiëren is niet gelukt. Selecteer de tekst en kopieer hem zelf."
    },
    "photo": {
      "camera": "Foto maken",
      "roll": "Kiezen uit foto's",
      "cropTitle": "Foto bijsnijden",
      "cropHint": "Verschuif met uw vinger of met de pijlen, en verander de grootte met de schuifregelaar.",
      "zoom": "Grootte",
      "panUp": "Omhoog",
      "panDown": "Omlaag",
      "panLeft": "Naar links",
      "panRight": "Naar rechts",
      "make": "Dit gebruiken",
      "fail": "De foto kon niet worden geladen"
    }
  },
  "set": {
    "hNormal": "Algemene instellingen",
    "hBackup": "Andere telefoon (back-up)",
    "fs": "Tekstgrootte",
    "fsSizes": [
      "Normaal",
      "Groot",
      "Heel groot"
    ],
    "lang": "ことば / Language",
    "theme": "Kleur",
    "themes": [
      "Groen",
      "Lichtblauw",
      "Wit",
      "Zwart"
    ],
    "bgm": "Muziek",
    "bgms": [
      "Geen",
      "Groene klank",
      "Blauwe klank"
    ],
    "sound": "Tikgeluid",
    "on": "AAN",
    "off": "UIT",
    "bkHint": "Stapt u over op een nieuwe telefoon? Tik dan op \"Exporteren\" om een bestand op te slaan, en tik daarna op de nieuwe telefoon op \"Importeren\".",
    "bkExport": "Exporteren",
    "bkImport": "Importeren",
    "exported": "Geëxporteerd ✓",
    "imported": "Geïmporteerd ✓",
    "importFail": "Importeren is niet gelukt",
    "importConfirm": "Uw huidige gegevens worden vervangen door de inhoud van het bestand. Wilt u importeren?",
    "note": "Alles wat u schrijft, wordt alleen op dit apparaat bewaard. Er wordt niets verstuurd.",
    "privacy": "Privacybeleid",
    "credit": "App ontwikkeld door SOYOGI, een adviespunt voor zorg en ondersteuning"
  },
  "guide": {
    "title": "Uitleg",
    "step": "{n} / {m}",
    "start": "Beginnen",
    "again": "Opnieuw bekijken",
    "heads": [
      "Welkom bij de Situatiegids",
      "Start en de tabs onderaan",
      "Woordenboek van uitdrukkingen",
      "Mijn draaiboeken",
      "Check vóór het spreken",
      "Achteraf opschrijven",
      "Aan de telefoon",
      "Alleen op dit apparaat"
    ],
    "bodies": [
      "Een gids voor uzelf: om na te slaan voordat u een situatie ingaat, en om in te schrijven als iets niet goed ging.\nHet is een hulpmiddel voor mensen die woorden snel letterlijk nemen, of die zich liever alleen voorbereiden zonder te oefenen waar anderen bij zijn.\nNiets hier geeft u de schuld of beoordeelt wat goed of fout is. U hoeft vooraf niets in te stellen.",
      "Op \"Start\" is \"Kies een situatie\" voor vóór een situatie. Daar staan \"Woordenboek van uitdrukkingen\", \"Mijn draaiboeken\" en \"Check vóór het spreken\".\n\"Achteraf opschrijven\" is voor als iets niet goed ging, en \"Aan de telefoon\" voor aantekeningen tijdens een gesprek.\nDe tabs onderaan (\"Situaties\", \"Achteraf\", \"Aan de telefoon\") openen dezelfde schermen.",
      "Zoek uitdrukkingen op die u vaak hoort (alleen in het Japans), via \"Zoeken op woord\" of met de situatieknoppen.\nTik op een uitdrukking voor \"Letterlijke betekenis\", \"Wat vaak bedoeld wordt (mogelijkheden)\" en \"Eén zin om het na te vragen\".\nDe betekenis verschilt per persoon en per moment. Twijfelt u? Dan kunt u het het beste even navragen.\nMet \"Een draaiboek schrijven voor deze uitdrukking\" begint u meteen een draaiboek.",
      "Schrijf per situatie op wat u zegt en doet. Regels die u zelf hebt bedacht, bewaart u bij \"Mijn regels\".\nTik op \"Iets nieuws schrijven\", vul situatie, titel en draaiboek in en tik op \"Opslaan\".\nOpen een opgeslagen draaiboek en tik op \"Groot tonen\" om het ter plekke in grote letters te lezen.",
      "Schrijf op wat u gaat zeggen en tik op \"Check beginnen\".\nBeantwoord met \"Volgende\" vier vragen op volgorde: wie, waar, wanneer en hoe de ander zich kan voelen. U hoeft het niet zeker te weten.\nMet \"Teruglezen\" ziet u de vier antwoorden bij elkaar. Kies daarna \"Dit opslaan\" of \"Stoppen zonder opslaan\".",
      "Schrijf zonder uzelf de schuld te geven in vier stappen op wat niet goed ging: \"Wat er gebeurde\", \"Wat ik later merkte\", \"Wat ik de volgende keer probeer\" en \"Waar ik om kan vragen\".\nTik op \"Iets nieuws schrijven\", kies de situatie, schrijf en tik op \"Opslaan\". Later kunt u per situatie teruglezen.\nMet \"Als tekst exporteren\" onder een lijst kunt u de tekst kopiëren. Maak namen van anderen en bedrijfsnamen eerst onherkenbaar.",
      "Schrijf tijdens het gesprek in de vier velden: \"Van wie\", \"Waarover\", \"Uiterlijk wanneer\" en \"Terugbellen naar\". Wat u typt, blijft staan, ook als u naar een ander scherm gaat.\n\"Groot tonen\" laat het in grote letters zien, en \"Dit gesprek bewaren\" zet het bij \"Recente gesprekken\" (maximaal 5).\n\"Velden leegmaken\" maakt de velden pas leeg als u daarna ook op \"Ja\" tikt.\nTik op een van de \"Zinnen om iets opnieuw te vragen\" om die in grote letters te tonen.",
      "Alles wat u schrijft, wordt alleen op dit apparaat bewaard en nergens naartoe gestuurd.\nStapt u over op een nieuwe telefoon? Tik dan bij \"Instellingen\" op \"Exporteren\" om een bestand op te slaan, en tik op de nieuwe telefoon op \"Importeren\".\nMet \"Tekstgrootte\" en \"Kleur\" bij \"Instellingen\" wordt het scherm beter leesbaar. De taal kiest u helemaal bovenaan bij \"Language\".\nU kunt deze uitleg opnieuw bekijken bij \"Instellingen\", met \"Opnieuw bekijken\" naast \"Uitleg\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Situatiegids",
      "bamen": "Kies een situatie",
      "bamenSub": "Woordenboek, draaiboeken, check vóór het spreken",
      "after": "Achteraf opschrijven",
      "afterSub": "Wat er gebeurde → wat ik de volgende keer probeer",
      "call": "Aan de telefoon",
      "callSub": "Van wie, waarover, uiterlijk wanneer, terugbellen",
      "note": "Wat u hier schrijft, blijft alleen op dit apparaat."
    },
    "bamen": {
      "title": "Kies een situatie",
      "hint": "Kies er één voordat u de situatie ingaat.",
      "dict": "Woordenboek van uitdrukkingen",
      "dictSub": "Letterlijk / wat vaak bedoeld wordt / hoe u het navraagt",
      "dictJaOnly": "(alleen in het Japans)",
      "script": "Mijn draaiboeken",
      "scriptSub": "Per situatie opschrijven en bewaren (Mijn regels staan hier ook)",
      "precheck": "Check vóór het spreken",
      "precheckSub": "Wie, waar, wanneer, hoe de ander zich kan voelen"
    },
    "dict": {
      "title": "Woordenboek van uitdrukkingen",
      "search": "Zoeken op woord",
      "searchPh": "bijv. 検討 of また",
      "count": "{n} uitdrukkingen",
      "lit": "Letterlijke betekenis",
      "maybe": "Wat vaak bedoeld wordt (mogelijkheden)",
      "ask": "Eén zin om het na te vragen",
      "caution": "De betekenis verschilt per persoon en per moment. Wat hier staat, zijn alleen veelvoorkomende mogelijkheden. Twijfelt u? Dan kunt u het het beste even navragen.",
      "jaOnly": "Dit woordenboek is alleen in het Japans.",
      "noHit": "Niets gevonden. Probeer het met een ander woord.",
      "toScript": "Een draaiboek schrijven voor deze uitdrukking",
      "draftTitle": "Als iemand \"{w}\" zegt"
    },
    "script": {
      "title": "Mijn draaiboeken",
      "hint": "Schrijf per situatie op wat u zegt en doet, en bewaar het. \"Mijn regels\" is de plek voor regels die u zelf hebt bedacht.",
      "add": "Iets nieuws schrijven",
      "edit": "Draaiboek aanpassen",
      "tag": "Situatie",
      "name": "Titel",
      "namePh": "bijv. \"Als ik in het ziekenhuis uitleg over medicijnen krijg\"",
      "body": "Draaiboek",
      "bodyPh": "Wat u zegt en doet, op volgorde.\nBijvoorbeeld: \"1. Mijn naam zeggen 2. Maar één onderwerp noemen 3. Als ik het niet begrijp: 'Kunt u dat nog een keer zeggen?'\"",
      "show": "Groot tonen",
      "empty": "Nog geen draaiboeken. U kunt beginnen met \"Iets nieuws schrijven\".",
      "needName": "Vul alstublieft een titel in"
    },
    "precheck": {
      "title": "Check vóór het spreken",
      "hint": "Schrijf op wat u gaat zeggen en beantwoord dan vier vragen op volgorde. De antwoorden zijn om zelf terug te lezen. Opslaan is niet verplicht.",
      "say": "Wat ik ga zeggen",
      "sayPh": "bijv. \"Kun je volgende week mijn dienst overnemen?\"",
      "q": [
        "Wie is de ander?",
        "Op welke plek?",
        "Wanneer? (Heeft de ander het dan druk?)",
        "Hoe zou de ander zich kunnen voelen als die dit hoort?"
      ],
      "qPh": [
        "bijv. \"Tanaka (verzonnen naam) uit mijn team\"",
        "bijv. \"de pauzeruimte\"",
        "bijv. \"tegen het einde van de lunchpauze\"",
        "bijv. \"het komt misschien onverwacht, dat kan lastig zijn\""
      ],
      "qHint": [
        "Weet u de naam niet? Dan is een functie (leidinggevende, docent, baliemedewerker) ook goed.",
        "Het helpt bij het teruglezen als u ook opschrijft of er mensen in de buurt zijn, of dat u met z'n tweeën bent.",
        "Denk erover na of de ander op dat moment even kan stoppen met wat die doet.",
        "U hoeft het niet zeker te weten. Schrijf het op als \"misschien\"."
      ],
      "step": "{n} / 4",
      "start": "Check beginnen",
      "review": "Teruglezen",
      "reviewTitle": "Teruglezen",
      "reviewHint": "Bekijk de vier antwoorden en denk erover na of u de woorden of het moment wilt veranderen. Niets veranderen is ook goed.",
      "redo": "Nog een keer",
      "saveIt": "Dit opslaan",
      "noSave": "Stoppen zonder opslaan",
      "saved": "Opgeslagen. U kunt het teruglezen bij \"Check vóór het spreken\" onder \"Situaties\".",
      "history": "Opgeslagen checks (maximaal 30)",
      "needSay": "Schrijf alstublieft op wat u gaat zeggen",
      "unanswered": "(nog niet ingevuld)",
      "quote": "\"{s}\""
    },
    "after": {
      "title": "Achteraf opschrijven (wat niet lukte en de volgende keer)",
      "hint": "Schrijf in vier stappen op wat niet goed ging, zonder uzelf de schuld te geven. Met de situatietag kunt u het later teruglezen.",
      "add": "Iets nieuws schrijven",
      "edit": "Aanpassen",
      "tag": "Situatie",
      "f": [
        "Wat er gebeurde",
        "Wat ik later merkte",
        "Wat ik de volgende keer probeer",
        "Waar ik om kan vragen"
      ],
      "fPh": [
        "bijv. \"Ik nam 'we nemen het in overweging' letterlijk en bleef wachten\"",
        "bijv. \"Het was misschien een beleefde manier om nee te zeggen\"",
        "bijv. \"De volgende keer vragen: 'Wanneer kan ik ongeveer een antwoord verwachten?'\"",
        "bijv. \"Mijn gezin vragen: 'Wat vinden jullie van dit antwoord?'\""
      ],
      "fHint": [
        "Schrijf alleen op wat er gebeurde. U hoeft niet te oordelen of het goed of fout was.",
        "Schrijf op wat u pas na een tijdje begreep.",
        "Iets kleins is goed. Maar één ding.",
        "Is er iets waar u iemand om kunt vragen? Zo niet, dan mag dit leeg blijven."
      ],
      "show": "Groot tonen",
      "empty": "Nog niets. Als iets niet goed ging, kunt u het hier bewaren.",
      "needWhat": "Vul alstublieft \"Wat er gebeurde\" in",
      "none": "(geen)",
      "exportHint": "Maak bij het exporteren alstublieft namen van andere mensen, bedrijfsnamen en dergelijke onherkenbaar."
    },
    "call": {
      "title": "Aan de telefoon",
      "hint": "Vul tijdens het gesprek vier velden in. Cijfers worden groot getoond. Alleen de laatste 5 worden bewaard.",
      "f": [
        "Van wie",
        "Waarover",
        "Uiterlijk wanneer",
        "Terugbellen naar"
      ],
      "fPh": [
        "bedrijf, naam",
        "in een paar woorden",
        "datum, tijd",
        "telefoonnummer, naam"
      ],
      "save": "Dit gesprek bewaren",
      "clear": "Velden leegmaken",
      "clearConfirm": "Weet u zeker dat u de velden wilt leegmaken?",
      "show": "Groot tonen",
      "recent": "Recente gesprekken (maximaal 5)",
      "empty": "Nog niets.",
      "needAny": "Vul alstublieft minstens één veld in",
      "askBack": "Zinnen om iets opnieuw te vragen",
      "askPhrases": [
        "Kunt u het nog een keer langzaam zeggen?",
        "Kunt u het mij schriftelijk sturen?",
        "Ik bel u terug, mag ik uw telefoonnummer?",
        "Ik zoek het uit en bel u terug"
      ]
    }
  }
});
/* ---- /nl ---- */
/* ---- sv: 翻訳 ---- */
TBL.sv = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Situationsguide - SOYOGI",
    "short": "Situationsguide",
    "tagline": "Din egen guide att titta i innan du går in i en situation."
  },
  "nav": {
    "home": "Hem",
    "bamen": "Situationer",
    "after": "Efteråt",
    "call": "Samtal nu",
    "set": "Alternativ"
  },
  "common": {
    "ok": "OK",
    "cancel": "Avbryt",
    "save": "Spara",
    "del": "Ta bort",
    "back": "Tillbaka",
    "close": "Stäng",
    "yes": "Ja",
    "no": "Nej",
    "add": "Lägg till",
    "edit": "Ändra",
    "next": "Nästa",
    "prev": "Föregående",
    "done": "Klart",
    "saved": "Sparat ✓",
    "saveFail": "Kunde inte spara",
    "storageFull": "Minnet är fullt, kunde inte spara",
    "deleted": "Borttaget",
    "delConfirm": "Vill du verkligen ta bort?",
    "empty": "Här finns inget ännu",
    "backConfirm": "Det du har skrivit är inte sparat än. Vill du slänga det och gå tillbaka?",
    "optional": "Du behöver inte fylla i allt.",
    "today": "Idag",
    "tags": {
      "all": "Alla",
      "work": "Arbete",
      "school": "Skola",
      "hospital": "Sjukhus",
      "shop": "Butik",
      "family": "Familj",
      "phone": "Telefon",
      "rule": "Mina regler"
    },
    "tagLabel": "Situation",
    "emptyTag": "Inget under ”{t}” ännu.",
    "exp": {
      "btn": "Exportera som text",
      "hint": "Dölj andras namn, företagsnamn och telefonnummer här innan du kopierar. Det du ändrar här ändrar inte det du har sparat.",
      "copy": "Kopiera",
      "copied": "Kopierat ✓",
      "copyFail": "Det gick inte att kopiera. Markera texten och kopiera den."
    },
    "photo": {
      "camera": "Ta ett foto",
      "roll": "Välj bland foton",
      "cropTitle": "Beskär fotot",
      "cropHint": "Flytta med fingret eller med pilarna och ändra storleken med reglaget.",
      "zoom": "Storlek",
      "panUp": "Upp",
      "panDown": "Ned",
      "panLeft": "Vänster",
      "panRight": "Höger",
      "make": "Använd den här",
      "fail": "Kunde inte läsa in fotot"
    }
  },
  "set": {
    "hNormal": "Vanliga inställningar",
    "hBackup": "Byta telefon (säkerhetskopia)",
    "fs": "Textstorlek",
    "fsSizes": [
      "Normal",
      "Stor",
      "Mycket stor"
    ],
    "lang": "ことば / Language",
    "theme": "Färg",
    "themes": [
      "Grön",
      "Ljusblå",
      "Vit",
      "Svart"
    ],
    "bgm": "Musik",
    "bgms": [
      "Ingen",
      "Grön ton",
      "Blå ton"
    ],
    "sound": "Tryckljud",
    "on": "ON",
    "off": "OFF",
    "bkHint": "När du byter till en ny telefon: tryck på ”Exportera” för att spara en fil och tryck sedan på ”Importera” på den nya telefonen.",
    "bkExport": "Exportera",
    "bkImport": "Importera",
    "exported": "Exporterat ✓",
    "imported": "Importerat ✓",
    "importFail": "Kunde inte importera",
    "importConfirm": "Det du har sparat nu ersätts med innehållet i filen. Vill du importera?",
    "note": "Allt du skriver sparas bara på den här enheten. Inget skickas någonstans.",
    "privacy": "Integritetspolicy",
    "credit": "Utvecklad av SOYOGI, en rådgivningstjänst för omsorg och stöd"
  },
  "guide": {
    "title": "Så fungerar appen",
    "step": "{n} / {m}",
    "start": "Börja",
    "again": "Visa igen",
    "heads": [
      "Välkommen till Situationsguide",
      "Hem och flikarna längst ner",
      "Ordbok för uttryck",
      "Mina manus",
      "Koll innan du säger något",
      "Skriv efteråt",
      "Samtal nu",
      "Bara på den här enheten"
    ],
    "bodies": [
      "Din egen guide: att titta i innan du går in i en situation, och att skriva i när något inte gick bra.\nDen är ett verktyg för dig som lätt tar ord bokstavligt, eller som vill förbereda dig på egen hand utan att öva inför andra.\nInget här klandrar dig eller bedömer vad som är bra eller dåligt. Du behöver inte ställa in något först.",
      "På ”Hem” är ”Välj situation” till för innan du går in i en situation. Där finns ”Ordbok för uttryck”, ”Mina manus” och ”Koll innan du säger något”.\n”Skriv efteråt” är till för när något inte gick bra, och ”Samtal nu” för anteckningar medan du pratar i telefon.\nFlikarna längst ner, ”Situationer”, ”Efteråt” och ”Samtal nu”, öppnar samma skärmar.",
      "Slå upp uttryck som man ofta hör (bara på japanska), genom att skriva i ”Sök på ord” eller med situationsknapparna.\nTryck på ett uttryck för att se ”Ordagrann betydelse”, ”Vanliga betydelser (förslag)” och ”En mening för att kolla”.\nBetydelsen kan skilja sig beroende på person och tillfälle. Om du är osäker är det bäst att fråga och kolla.\nMed ”Skriv ett manus för det här uttrycket” börjar du direkt på ett manus.",
      "Skriv ner vad du säger och gör, för varje situation. Regler som du själv har bestämt samlar du under ”Mina regler”.\nTryck på ”Skriv nytt”, fyll i situation, titel och manus och tryck på ”Spara”.\nÖppna ett sparat manus och tryck på ”Visa stort” för att läsa det med stor text på plats.",
      "Skriv vad du tänker säga och tryck på ”Starta kollen”.\nSvara med ”Nästa” på fyra frågor i tur och ordning: vem, var, när och hur den andra kan uppleva det. Du behöver inte vara säker.\nMed ”Se över” ser du de fyra svaren tillsammans. Välj sedan ”Spara den här” eller ”Avsluta utan att spara”.",
      "Skriv ner det som inte gick bra i fyra steg, utan att klandra någon: ”Vad hände”, ”Vad jag märkte efteråt”, ”Vad jag provar nästa gång” och ”Vad jag kan be någon om”.\nTryck på ”Skriv nytt”, välj situation, skriv och tryck på ”Spara”. Senare kan du läsa igen per situation.\nMed ”Exportera som text” under en lista kan du kopiera texten. Dölj andras namn och företagsnamn innan du kopierar.",
      "Skriv i de fyra fälten medan du lyssnar i telefon: ”Från vem”, ”Ärende”, ”Till när” och ”Ring tillbaka till”. Det du skriver finns kvar även om du går till en annan skärm.\n”Visa stort” visar det med stor text, och ”Spara samtalet” lägger det under ”Senaste samtal” (upp till 5).\n”Töm fälten” tömmer fälten först när du också har tryckt på ”Ja”.\nTryck på en av ”Fraser för att fråga igen” för att visa den med stor text.",
      "Allt du skriver sparas bara på den här enheten och skickas ingenstans.\nNär du byter till en ny telefon: tryck på ”Exportera” i ”Alternativ” för att spara en fil, och tryck sedan på ”Importera” på den nya telefonen.\nMed ”Textstorlek” och ”Färg” i ”Alternativ” blir skärmen lättare att läsa. Språket väljer du längst upp vid ”Language”.\nDu kan se den här guiden igen i ”Alternativ”, med ”Visa igen” vid ”Så fungerar appen”."
    ]
  },
  "screen": {
    "home": {
      "title": "Situationsguide",
      "bamen": "Välj situation",
      "bamenSub": "Ordbok, manus, koll innan du säger något",
      "after": "Skriv efteråt",
      "afterSub": "Vad hände → vad du kan prova nästa gång",
      "call": "Samtal nu",
      "callSub": "Från vem, ärende, till när, ring tillbaka",
      "note": "Det du skriver här stannar bara på den här enheten."
    },
    "bamen": {
      "title": "Välj situation",
      "hint": "Välj en innan du går in i situationen.",
      "dict": "Ordbok för uttryck",
      "dictSub": "Ordagrant / vanliga betydelser / så kan du kolla",
      "dictJaOnly": "(bara på japanska)",
      "script": "Mina manus",
      "scriptSub": "Skriv för varje situation (Mina regler finns också här)",
      "precheck": "Koll innan du säger något",
      "precheckSub": "Vem, var, när, hur den andra kan uppleva det"
    },
    "dict": {
      "title": "Ordbok för uttryck",
      "search": "Sök på ord",
      "searchPh": "t.ex. 検討 eller また",
      "count": "{n} uttryck",
      "lit": "Ordagrann betydelse",
      "maybe": "Vanliga betydelser (förslag)",
      "ask": "En mening för att kolla",
      "caution": "Betydelsen kan skilja sig beroende på person och tillfälle. Här finns bara ”vanliga förslag”. Om du är osäker är det bäst att fråga och kolla.",
      "jaOnly": "Den här ordboken finns bara på japanska.",
      "noHit": "Inget hittades. Försök söka med ett annat ord.",
      "toScript": "Skriv ett manus för det här uttrycket",
      "draftTitle": "När någon säger ”{w}”"
    },
    "script": {
      "title": "Mina manus",
      "hint": "Skriv ner vad du säger och gör, för varje situation. ”Mina regler” är där du samlar regler som du själv har bestämt.",
      "add": "Skriv nytt",
      "edit": "Ändra manus",
      "tag": "Situation",
      "name": "Titel",
      "namePh": "t.ex. ”När någon förklarar min medicin på sjukhuset”",
      "body": "Manus",
      "bodyPh": "Vad du säger och gör, i tur och ordning.\nt.ex. ”1. Säg ditt namn 2. Säg bara ett ärende 3. Om du inte förstår, säg ’Kan du ta det en gång till?’”",
      "show": "Visa stort",
      "empty": "Inga manus ännu. Du kan börja med ”Skriv nytt”.",
      "needName": "Skriv en titel"
    },
    "precheck": {
      "title": "Koll innan du säger något",
      "hint": "Skriv vad du tänker säga och svara på fyra frågor i tur och ordning. Svaren är till för att du själv ska kunna titta på dem igen. Du väljer själv om du vill spara.",
      "say": "Det jag tänker säga",
      "sayPh": "t.ex. ”Jag skulle vilja byta pass nästa vecka”",
      "q": [
        "Vem är den andra personen?",
        "Var är det?",
        "När är det? (Har den andra mycket att göra då?)",
        "Hur kan den andra känna sig när hen hör det?"
      ],
      "qPh": [
        "t.ex. ”Tanaka i samma arbetslag (exempelnamn)”",
        "t.ex. ”pausrummet”",
        "t.ex. ”i slutet av lunchrasten”",
        "t.ex. ”hen kanske blir besvärad för att det kommer plötsligt”"
      ],
      "qHint": [
        "Om du inte vet namnet går det bra med rollen (chef, lärare, personen i receptionen).",
        "Det blir lättare att titta igen om du skriver om det finns folk runt omkring eller om ni är bara två.",
        "Fundera på om den andra kan avbryta det hen håller på med.",
        "Du behöver inte vara säker. Skriv med ”kanske”."
      ],
      "step": "{n} / 4",
      "start": "Starta kollen",
      "review": "Se över",
      "reviewTitle": "Se över svaren",
      "reviewHint": "Läs de fyra svaren och fundera på om du vill ändra hur du säger det eller när. Det går också bra att inte ändra något.",
      "redo": "En gång till",
      "saveIt": "Spara den här",
      "noSave": "Avsluta utan att spara",
      "saved": "Sparat. Du kan titta på den igen via ”Koll innan du säger något” under ”Situationer”.",
      "history": "Sparade kollar (upp till 30)",
      "needSay": "Skriv vad du tänker säga",
      "unanswered": "(inte skrivet ännu)",
      "quote": "”{s}”"
    },
    "after": {
      "title": "Skriv efteråt (misstag och nästa gång)",
      "hint": "Skriv ner det som inte gick bra i fyra steg, utan att klandra någon. Senare kan du läsa det igen per situation.",
      "add": "Skriv nytt",
      "edit": "Ändra",
      "tag": "Situation",
      "f": [
        "Vad hände",
        "Vad jag märkte efteråt",
        "Vad jag provar nästa gång",
        "Vad jag kan be någon om"
      ],
      "fPh": [
        "t.ex. ”Jag trodde att ’vi ska fundera på det’ var på riktigt och väntade”",
        "t.ex. ”Det kanske var ett sätt att säga nej”",
        "t.ex. ”Nästa gång frågar jag ’Ungefär när kan jag få svar?’”",
        "t.ex. ”Fråga någon i familjen ’Vad tycker du om det här svaret?’”"
      ],
      "fHint": [
        "Skriv bara vad som hände. Du behöver inte skriva om det var bra eller dåligt.",
        "Skriv det som du förstod när det hade gått en tid.",
        "Något litet går bra. Bara en sak.",
        "Om det finns något du kan be någon om. Annars går det bra att lämna tomt."
      ],
      "show": "Visa stort",
      "empty": "Inget ännu. Om något inte går som du tänkt kan du skriva det här.",
      "needWhat": "Skriv ”Vad hände”",
      "none": "(inget)",
      "exportHint": "När du exporterar: dölj andras namn, företagsnamn och liknande."
    },
    "call": {
      "title": "Samtal nu",
      "hint": "Fyll i fyra fält medan du lyssnar i telefon. Siffror visas stort. Bara de 5 senaste sparas.",
      "f": [
        "Från vem",
        "Ärende",
        "Till när",
        "Ring tillbaka till"
      ],
      "fPh": [
        "företag, namn",
        "med några ord",
        "datum, tid",
        "telefonnummer, namn"
      ],
      "save": "Spara samtalet",
      "clear": "Töm fälten",
      "clearConfirm": "Vill du verkligen tömma fälten?",
      "show": "Visa stort",
      "recent": "Senaste samtal (upp till 5)",
      "empty": "Inget ännu.",
      "needAny": "Fyll i minst ett fält",
      "askBack": "Fraser för att fråga igen",
      "askPhrases": [
        "Kan du säga det igen, lite långsammare?",
        "Kan du skicka det skriftligt?",
        "Jag ringer tillbaka, kan jag få ditt nummer?",
        "Jag kollar upp det och ringer tillbaka."
      ]
    }
  }
});
/* ---- /sv ---- */
/* ---- ko: 翻訳 ---- */
TBL.ko = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "상황별 길잡이 - SOYOGI",
    "short": "상황별 길잡이",
    "tagline": "장면에 들어가기 전에 펼쳐 보는, 나를 위한 안내서."
  },
  "nav": {
    "home": "홈",
    "bamen": "장면",
    "after": "나중에",
    "call": "지금 전화",
    "set": "설정"
  },
  "common": {
    "ok": "확인",
    "cancel": "취소",
    "save": "저장",
    "del": "삭제",
    "back": "뒤로",
    "close": "닫기",
    "yes": "네",
    "no": "아니요",
    "add": "추가",
    "edit": "수정",
    "next": "다음",
    "prev": "이전",
    "done": "완료",
    "saved": "저장했어요 ✓",
    "saveFail": "저장하지 못했어요",
    "storageFull": "공간이 가득 차서 저장할 수 없어요",
    "deleted": "삭제했어요",
    "delConfirm": "정말 삭제할까요?",
    "empty": "아직 아무것도 없어요",
    "backConfirm": "쓴 내용이 아직 저장되지 않았어요. 버리고 돌아갈까요?",
    "optional": "전부 쓰지 않아도 괜찮아요.",
    "today": "오늘",
    "tags": {
      "all": "전체",
      "work": "직장",
      "school": "학교",
      "hospital": "병원",
      "shop": "가게",
      "family": "가족",
      "phone": "전화",
      "rule": "나의 규칙집"
    },
    "tagLabel": "장면",
    "emptyTag": "‘{t}’에는 아직 없어요.",
    "exp": {
      "btn": "글자로 내보내기",
      "hint": "복사하기 전에 여기서 다른 사람의 이름, 회사 이름, 전화번호를 가려 주세요. 여기서 고쳐도 저장한 내용은 바뀌지 않아요.",
      "copy": "복사하기",
      "copied": "복사했어요 ✓",
      "copyFail": "복사하지 못했어요. 글자를 선택해서 복사해 주세요."
    },
    "photo": {
      "camera": "카메라로 찍기",
      "roll": "사진에서 고르기",
      "cropTitle": "사진 자르기",
      "cropHint": "손가락으로 움직이거나 화살표로 맞추고, 슬라이더로 크기를 바꿔요.",
      "zoom": "크기",
      "panUp": "위로",
      "panDown": "아래로",
      "panLeft": "왼쪽으로",
      "panRight": "오른쪽으로",
      "make": "이걸로 정하기",
      "fail": "사진을 불러오지 못했어요"
    }
  },
  "set": {
    "hNormal": "평소 설정",
    "hBackup": "기기 변경(백업)",
    "fs": "글자 크기",
    "fsSizes": [
      "보통",
      "크게",
      "아주 크게"
    ],
    "lang": "ことば / Language",
    "theme": "색",
    "themes": [
      "초록",
      "하늘색",
      "흰색",
      "검정"
    ],
    "bgm": "BGM",
    "bgms": [
      "없음",
      "초록의 소리",
      "파랑의 소리"
    ],
    "sound": "탭 소리",
    "on": "ON",
    "off": "OFF",
    "bkHint": "새 스마트폰으로 옮길 때는 ‘내보내기’로 파일을 저장한 뒤, 새 스마트폰에서 ‘불러오기’를 눌러 주세요.",
    "bkExport": "내보내기",
    "bkImport": "불러오기",
    "exported": "내보냈어요 ✓",
    "imported": "불러왔어요 ✓",
    "importFail": "불러오지 못했어요",
    "importConfirm": "지금 내용이 파일의 내용으로 바뀌어요. 불러올까요?",
    "note": "쓴 내용은 모두 이 기기 안에만 저장돼요. 어디로도 보내지지 않아요.",
    "privacy": "개인정보 처리방침",
    "credit": "앱 개발: 돌봄과 지원 상담소 SOYOGI"
  },
  "guide": {
    "title": "사용법",
    "step": "{n} / {m}",
    "start": "시작하기",
    "again": "다시 보기",
    "heads": [
      "상황별 길잡이에 어서 오세요",
      "홈과 아래쪽 탭",
      "표현 사전",
      "나의 대본",
      "말하기 전 점검",
      "나중에 쓰기(실패와 다음)",
      "지금 전화",
      "이 기기 안에만 남아요"
    ],
    "bodies": [
      "장면에 들어가기 전에 펼쳐 보고, 잘 안 된 뒤에 적어 두는, 나를 위한 안내서예요.\n말을 글자 그대로 받아들이기 쉬운 사람이나, 남 앞에서 연습하지 않고 혼자 준비하고 싶은 사람을 위한 도구예요.\n탓하거나 좋고 나쁨을 판정하지 않아요. 처음에 정해 둘 것도 없어요.",
      "홈의 ‘장면 고르기’는 장면에 들어가기 전에 써요. ‘표현 사전’, ‘나의 대본’, ‘말하기 전 점검’이 있어요.\n‘나중에 쓰기’는 잘 안 된 뒤에, ‘지금 전화’는 전화를 들으면서 써요.\n아래쪽 탭의 ‘장면’, ‘나중에’, ‘지금 전화’에서도 같은 화면으로 갈 수 있어요.",
      "자주 듣는 표현을 ‘단어로 찾기’나 장면 버튼으로 찾아볼 수 있어요(일본어만).\n표현을 누르면 ‘말 그대로의 뜻’, ‘흔히 담긴 뜻(후보)’, ‘확인할 때 쓰는 한마디’가 나와요.\n뜻은 상대나 때에 따라 달라요. 헷갈리면 물어서 확인하는 것이 가장 좋아요.\n‘이 표현의 대본 쓰기’로 바로 대본을 쓰기 시작할 수 있어요.",
      "장면별로 내가 할 말과 할 일을 적어 둬요. 스스로 정한 규칙은 ‘나의 규칙집’에 모아요.\n‘새로 쓰기’를 누르고 장면, 제목, 대본을 쓴 뒤 ‘저장’을 눌러요.\n저장한 대본을 열고 ‘크게 보기’를 누르면 그 자리에서 큰 글자로 볼 수 있어요.",
      "지금부터 할 말을 쓰고 ‘점검 시작하기’를 눌러요.\n‘다음’으로 4가지 물음(상대 · 장소 · 시간 · 상대는 어떻게 느낄까)에 차례대로 답해요. 단정하지 않아도 괜찮아요.\n‘돌아보기’로 4가지 답을 모아 본 뒤, ‘저장해 두기’나 ‘저장하지 않고 끝내기’를 골라요.",
      "잘 안 된 일을 탓하지 않고 ‘무슨 일이 있었나’, ‘나중에 알아챈 것’, ‘다음에 해 볼 것’, ‘부탁할 수 있는 것’의 4단계로 남겨요.\n‘새로 쓰기’로 장면을 골라 쓰고 ‘저장’을 눌러요. 나중에 장면 버튼으로 좁혀서 다시 읽을 수 있어요.\n목록 아래의 ‘글자로 내보내기’로 글자로 복사할 수 있어요. 다른 사람의 이름이나 회사 이름은 가린 뒤에 복사해 주세요.",
      "전화를 들으면서 ‘누구에게서’, ‘용건’, ‘언제까지’, ‘회신할 곳’ 4개의 칸에 써요. 쓴 글자는 다른 화면에 가도 남아요.\n‘크게 보기’로 큰 글자로 보고, ‘이 전화 남기기’로 ‘최근 전화’에 남길 수 있어요(5건까지).\n‘칸 비우기’는 이어서 ‘네’를 눌렀을 때만 칸이 비워져요.\n‘되물을 때 쓰는 말’은 누르면 큰 글자로 나와요.",
      "쓴 내용은 모두 이 기기 안에만 저장되고, 어디로도 보내지지 않아요.\n새 스마트폰으로 옮길 때는 ‘설정’의 ‘내보내기’로 파일을 저장한 뒤, 새 스마트폰에서 ‘불러오기’를 눌러 주세요.\n‘설정’의 ‘글자 크기’와 ‘색’으로 보기 편하게 할 수 있어요. 언어는 화면 맨 위의 ‘Language’에서 골라요.\n이 안내는 ‘설정’의 ‘사용법’에서 ‘다시 보기’를 누르면 다시 볼 수 있어요."
    ]
  },
  "screen": {
    "home": {
      "title": "상황별 길잡이",
      "bamen": "장면 고르기",
      "bamenSub": "사전 · 대본 · 말하기 전 점검",
      "after": "나중에 쓰기",
      "afterSub": "무슨 일이 있었나 → 다음에 해 볼 것",
      "call": "지금 전화",
      "callSub": "누구에게서 · 용건 · 언제까지 · 회신",
      "note": "여기에 쓴 내용은 이 기기 안에만 남아요."
    },
    "bamen": {
      "title": "장면 고르기",
      "hint": "장면에 들어가기 전에 하나를 골라 주세요.",
      "dict": "표현 사전",
      "dictSub": "말 그대로의 뜻 / 흔히 담긴 뜻 / 확인하는 법",
      "dictJaOnly": "(일본어만)",
      "script": "나의 대본",
      "scriptSub": "장면별로 적어 두기(나의 규칙집도 여기에)",
      "precheck": "말하기 전 점검",
      "precheckSub": "상대 · 장소 · 시간 · 상대는 어떻게 느낄까"
    },
    "dict": {
      "title": "표현 사전",
      "search": "단어로 찾기",
      "searchPh": "예: ‘検討’, ‘また’",
      "count": "표현 {n}개",
      "lit": "말 그대로의 뜻",
      "maybe": "흔히 담긴 뜻(후보)",
      "ask": "확인할 때 쓰는 한마디",
      "caution": "뜻은 상대나 때에 따라 달라요. 여기 있는 것은 ‘흔한 후보’예요. 헷갈리면 물어서 확인하는 것이 가장 좋아요.",
      "jaOnly": "이 사전은 일본어로만 되어 있어요.",
      "noHit": "찾지 못했어요. 다른 단어로 찾아봐 주세요.",
      "toScript": "이 표현의 대본 쓰기",
      "draftTitle": "‘{w}’라는 말을 들었을 때"
    },
    "script": {
      "title": "나의 대본",
      "hint": "장면별로 내가 할 말과 할 일을 적어 둬요. ‘나의 규칙집’은 스스로 정한 규칙을 모아 두는 곳이에요.",
      "add": "새로 쓰기",
      "edit": "대본 수정",
      "tag": "장면",
      "name": "제목",
      "namePh": "예: ‘병원에서 약 설명을 들을 때’",
      "body": "대본",
      "bodyPh": "할 말과 할 일을 순서대로.\n예: ‘1. 이름을 말한다 2. 용건을 하나만 말한다 3. 잘 모르겠으면 “한 번 더 부탁드려요”’",
      "show": "크게 보기",
      "empty": "아직 대본이 없어요. ‘새로 쓰기’에서 시작할 수 있어요.",
      "needName": "제목을 써 주세요"
    },
    "precheck": {
      "title": "말하기 전 점검",
      "hint": "지금부터 할 말을 쓰고, 4가지 물음에 차례대로 답해요. 답은 나중에 스스로 돌아보기 위한 것이고, 저장은 선택이에요.",
      "say": "지금부터 할 말",
      "sayPh": "예: ‘다음 주 당번을 바꿔 주면 좋겠어요’",
      "q": [
        "상대는 누구인가요",
        "장소는 어디인가요",
        "시간은 언제인가요(상대가 바쁜 때인가요)",
        "상대는 그 말을 듣고 어떻게 느낄 것 같나요"
      ],
      "qPh": [
        "예: ‘같은 팀의 다나카 씨(가명)’",
        "예: ‘휴게실’",
        "예: ‘점심시간이 끝날 무렵’",
        "예: ‘갑자기 들으면 곤란할지도 모른다’"
      ],
      "qHint": [
        "이름을 모르면 입장(상사 · 선생님 · 접수 담당자)으로 써도 괜찮아요.",
        "주위에 사람이 있는 곳인지, 둘만 있는 곳인지도 적어 두면 돌아보기 쉬워요.",
        "상대가 하던 일을 멈출 수 있는 시간인지 생각해 봐요.",
        "단정하지 않아도 괜찮아요. ‘~일지도 모른다’로 써요."
      ],
      "step": "{n} / 4",
      "start": "점검 시작하기",
      "review": "돌아보기",
      "reviewTitle": "돌아보기",
      "reviewHint": "4가지 답을 보고, 말투나 타이밍을 바꿀지 생각해 봐요. 바꾸지 않아도 괜찮아요.",
      "redo": "한 번 더",
      "saveIt": "저장해 두기",
      "noSave": "저장하지 않고 끝내기",
      "saved": "저장했어요. ‘장면’의 ‘말하기 전 점검’에서 다시 볼 수 있어요.",
      "history": "저장한 점검(30건까지)",
      "needSay": "할 말을 써 주세요",
      "unanswered": "(아직 쓰지 않았어요)",
      "quote": "“{s}”"
    },
    "after": {
      "title": "나중에 쓰기(실패와 다음)",
      "hint": "잘 안 된 일을 탓하지 않고 4단계로 남겨요. 장면 태그로 나중에 다시 읽어 볼 수 있어요.",
      "add": "새로 쓰기",
      "edit": "수정",
      "tag": "장면",
      "f": [
        "무슨 일이 있었나",
        "나중에 알아챈 것",
        "다음에 해 볼 것",
        "부탁할 수 있는 것"
      ],
      "fPh": [
        "예: ‘“검토하겠습니다”를 진심으로 알고 기다리고 있었다’",
        "예: ‘거절하는 말이었을지도 모른다’",
        "예: ‘다음에는 “언제쯤 답을 받을 수 있을까요?”라고 물어본다’",
        "예: ‘가족에게 “이 답은 어떻게 생각해?”라고 묻는다’"
      ],
      "fHint": [
        "일어난 일만 써요. 좋고 나쁨은 쓰지 않아도 괜찮아요.",
        "시간이 지나고 나서 알게 된 것을 써요.",
        "작은 것이어도 괜찮아요. 하나만.",
        "다른 사람에게 부탁할 수 있는 것이 있으면 써요. 없으면 비워 둬도 괜찮아요."
      ],
      "show": "크게 보기",
      "empty": "아직 없어요. 잘 안 된 일이 있으면 여기에 남길 수 있어요.",
      "needWhat": "‘무슨 일이 있었나’를 써 주세요",
      "none": "(없음)",
      "exportHint": "내보낼 때는 다른 사람의 이름이나 회사 이름 등을 가려 주세요."
    },
    "call": {
      "title": "지금 전화",
      "hint": "전화를 들으면서 4개의 칸에 써요. 숫자는 크게 보여요. 최근 5건만 남아요.",
      "f": [
        "누구에게서",
        "용건",
        "언제까지",
        "회신할 곳"
      ],
      "fPh": [
        "회사 이름 · 이름",
        "한마디로",
        "날짜 · 시각",
        "전화번호 · 이름"
      ],
      "save": "이 전화 남기기",
      "clear": "칸 비우기",
      "clearConfirm": "정말 칸을 비울까요?",
      "show": "크게 보기",
      "recent": "최근 전화(5건까지)",
      "empty": "아직 없어요.",
      "needAny": "어느 칸이든 하나는 써 주세요",
      "askBack": "되물을 때 쓰는 말",
      "askPhrases": [
        "한 번 더 천천히 말씀해 주시겠어요?",
        "문자로 보내 주실 수 있을까요?",
        "다시 전화드릴 테니 전화번호를 알려 주시겠어요?",
        "확인하고 다시 전화드릴게요"
      ]
    }
  }
});
/* ---- /ko ---- */
/* ---- zh: 翻訳 ---- */
TBL.zh = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "场合指南 - SOYOGI",
    "short": "场合指南",
    "tagline": "进入场景之前翻一翻，写给自己的指南。"
  },
  "nav": {
    "home": "首页",
    "bamen": "场景",
    "after": "事后",
    "call": "通话中",
    "set": "设置"
  },
  "common": {
    "ok": "确定",
    "cancel": "取消",
    "save": "保存",
    "del": "删除",
    "back": "返回",
    "close": "关闭",
    "yes": "是",
    "no": "否",
    "add": "添加",
    "edit": "修改",
    "next": "下一步",
    "prev": "上一步",
    "done": "完成",
    "saved": "已保存 ✓",
    "saveFail": "没能保存",
    "storageFull": "空间已满，无法保存",
    "deleted": "已删除",
    "delConfirm": "真的要删除吗？",
    "empty": "还什么都没有",
    "backConfirm": "写的内容还没有保存。要放弃并返回吗？",
    "optional": "不用全部都写。",
    "today": "今天",
    "tags": {
      "all": "全部",
      "work": "职场",
      "school": "学校",
      "hospital": "医院",
      "shop": "商店",
      "family": "家人",
      "phone": "电话",
      "rule": "我的规则集"
    },
    "tagLabel": "场景",
    "emptyTag": "“{t}”里还没有。",
    "exp": {
      "btn": "导出为文字",
      "hint": "复制之前，请在这里把别人的名字、公司名和电话号码隐去。在这里修改不会改变已保存的内容。",
      "copy": "复制",
      "copied": "已复制 ✓",
      "copyFail": "无法复制。请选中文字后复制。"
    },
    "photo": {
      "camera": "用相机拍",
      "roll": "从照片中选",
      "cropTitle": "裁剪照片",
      "cropHint": "用手指拖动，或用箭头对准，再用滑块调整大小。",
      "zoom": "大小",
      "panUp": "向上",
      "panDown": "向下",
      "panLeft": "向左",
      "panRight": "向右",
      "make": "就用这个",
      "fail": "没能读取照片"
    }
  },
  "set": {
    "hNormal": "常用设置",
    "hBackup": "更换手机(备份)",
    "fs": "文字大小",
    "fsSizes": [
      "普通",
      "大",
      "很大"
    ],
    "lang": "ことば / Language",
    "theme": "颜色",
    "themes": [
      "绿色",
      "浅蓝",
      "白色",
      "黑色"
    ],
    "bgm": "BGM",
    "bgms": [
      "无",
      "绿之音",
      "蓝之音"
    ],
    "sound": "点击音",
    "on": "ON",
    "off": "OFF",
    "bkHint": "换新手机时，请先点“导出”保存文件，再在新手机上点“导入”。",
    "bkExport": "导出",
    "bkImport": "导入",
    "exported": "已导出 ✓",
    "imported": "已导入 ✓",
    "importFail": "没能导入",
    "importConfirm": "现在的内容会被文件里的内容替换。要导入吗？",
    "note": "写下的内容全部只保存在这台设备里，不会发送到任何地方。",
    "privacy": "隐私政策",
    "credit": "应用开发：护理与支援咨询处 SOYOGI"
  },
  "guide": {
    "title": "使用方法",
    "step": "{n} / {m}",
    "start": "开始",
    "again": "再看一次",
    "heads": [
      "欢迎使用场合指南",
      "首页和下方的标签",
      "说法词典",
      "我的台本",
      "说之前的检查",
      "事后记下(失败与下一步)",
      "通话中",
      "只保存在这台设备里"
    ],
    "bodies": [
      "这是写给自己的指南：进入场景之前翻一翻，没做好之后记下来。\n它是为容易按字面理解话语的人，或想不在别人面前练习、一个人做准备的人准备的工具。\n这里不责备，也不评判好坏。一开始也不需要做任何设置。",
      "首页的“选择场景”在进入场景之前使用，里面有“说法词典”“我的台本”“说之前的检查”。\n“事后记下”在没做好之后使用，“通话中”在边听电话边记录时使用。\n从下方标签的“场景”“事后”“通话中”也能去同样的画面。",
      "可以用“按词语搜索”或场景按钮，查找常听到的说法(仅日语)。\n点一个说法，会显示“字面意思”“常见含义(候选)”“用来确认的一句话”。\n意思会因对方和时机而不同。拿不准时，问一问、确认一下是最好的。\n点“为这个说法写台本”，可以直接开始写台本。",
      "按场景记下自己要说的话、要做的事。自己定下的规则，收集在“我的规则集”里。\n点“写新的”，填好场景、标题和台本，再点“保存”。\n打开保存的台本，点“放大查看”，就能当场用大字看。",
      "写下接下来要说的话，然后点“开始检查”。\n用“下一步”按顺序回答4个问题：对方、地点、时间、对方会有什么感受。不用下定论也没关系。\n点“回看”一起看4个答案，然后选择“保存下来”或“不保存，直接结束”。",
      "把没做好的事，不带责备地分“发生了什么”“事后注意到的”“下次试试”“可以请人帮忙的事”4栏记下来。\n点“写新的”，选好场景后书写，再点“保存”。之后可以用场景按钮筛选回看。\n用列表下方的“导出为文字”，可以把内容复制成文字。请先把别人的名字、公司名等隐去再复制。",
      "边听电话边填“谁打来”“什么事”“期限”“回电给谁”4栏。写下的字，去别的画面也会保留。\n点“放大查看”用大字显示，点“保存这通电话”留在“最近的电话”里(最多5条)。\n“清空各栏”要再点一次“是”才会清空。\n点“请对方再说一遍时的说法”里的一句，会用大字显示。",
      "写下的内容全部只保存在这台设备里，不会发送到任何地方。\n换新手机时，请先在“设置”里点“导出”保存文件，再在新手机上点“导入”。\n用“设置”里的“文字大小”和“颜色”，可以让画面更容易看。语言可以在画面最上方的“Language”中选择。\n这份说明可以在“设置”的“使用方法”里点“再看一次”重新查看。"
    ]
  },
  "screen": {
    "home": {
      "title": "场合指南",
      "bamen": "选择场景",
      "bamenSub": "词典·台本·说之前的检查",
      "after": "事后记下",
      "afterSub": "发生了什么 → 下次试试",
      "call": "通话中",
      "callSub": "谁打来·什么事·期限·回电",
      "note": "写在这里的内容，只留在这台设备里。"
    },
    "bamen": {
      "title": "选择场景",
      "hint": "进入场景之前，请选一项。",
      "dict": "说法词典",
      "dictSub": "字面意思 / 常见含义 / 确认方法",
      "dictJaOnly": "(仅日语)",
      "script": "我的台本",
      "scriptSub": "按场景记下来(“我的规则集”也在这里)",
      "precheck": "说之前的检查",
      "precheckSub": "对方·地点·时间·对方会有什么感受"
    },
    "dict": {
      "title": "说法词典",
      "search": "按词语搜索",
      "searchPh": "例如“検討”“また”",
      "count": "{n} 条",
      "lit": "字面意思",
      "maybe": "常见含义(候选)",
      "ask": "用来确认的一句话",
      "caution": "意思会因对方和时机而不同。这里列出的只是“常见的候选”。拿不准时，问一问、确认一下是最好的。",
      "jaOnly": "这本词典只有日语。",
      "noHit": "没有找到。请换个词再搜搜看。",
      "toScript": "为这个说法写台本",
      "draftTitle": "别人说“{w}”的时候"
    },
    "script": {
      "title": "我的台本",
      "hint": "按场景记下自己要说的话、要做的事。“我的规则集”用来收集自己定下的规则。",
      "add": "写新的",
      "edit": "修改台本",
      "tag": "场景",
      "name": "标题",
      "namePh": "例如“在医院听药物说明时”",
      "body": "台本",
      "bodyPh": "按顺序写下要说的话、要做的事。\n例如“1. 说出名字 2. 只说一件事 3. 听不懂就说‘请再说一遍’”",
      "show": "放大查看",
      "empty": "还没有台本。可以从“写新的”开始。",
      "needName": "请写标题"
    },
    "precheck": {
      "title": "说之前的检查",
      "hint": "写下接下来要说的话，再按顺序回答4个问题。答案是给自己回看用的，保存与否可以自己决定。",
      "say": "接下来要说的话",
      "sayPh": "例如“下周的值班，想请对方替一下”",
      "q": [
        "对方是谁",
        "在什么地方",
        "在什么时间(对方正忙吗)",
        "对方听了可能会有什么感受"
      ],
      "qPh": [
        "例如“同组的田中(化名)”",
        "例如“休息室”",
        "例如“午休快结束的时候”",
        "例如“突然被这么说，可能会为难”"
      ],
      "qHint": [
        "不知道名字的话，写身份(上司、老师、前台的人)也可以。",
        "写上周围有没有别人、还是只有两个人，回看时会更清楚。",
        "想一想这时对方能不能停下手头的事。",
        "不用下定论。用“也许”来写就好。"
      ],
      "step": "{n} / 4",
      "start": "开始检查",
      "review": "回看",
      "reviewTitle": "回看",
      "reviewHint": "看看这4个答案，想一想要不要换个说法或时机。不换也没关系。",
      "redo": "再来一次",
      "saveIt": "保存下来",
      "noSave": "不保存，直接结束",
      "saved": "已保存。可以在“场景”的“说之前的检查”里回看。",
      "history": "已保存的检查(最多30条)",
      "needSay": "请写下要说的话",
      "unanswered": "(还没写)",
      "quote": "“{s}”"
    },
    "after": {
      "title": "事后记下(失败与下一步)",
      "hint": "把没做好的事，不带责备地分4栏记下来。之后可以按场景标签回看。",
      "add": "写新的",
      "edit": "修改",
      "tag": "场景",
      "f": [
        "发生了什么",
        "事后注意到的",
        "下次试试",
        "可以请人帮忙的事"
      ],
      "fPh": [
        "例如“把‘我们会考虑’当真，一直在等”",
        "例如“那也许是委婉的拒绝”",
        "例如“下次问问‘大概什么时候能给答复’”",
        "例如“问家人‘这个答复你怎么看’”"
      ],
      "fHint": [
        "只写发生的事。不用写好或不好。",
        "写过了一段时间才明白的事。",
        "小事就可以。只写一件。",
        "有可以请别人帮忙的事就写。没有的话空着也没关系。"
      ],
      "show": "放大查看",
      "empty": "还没有。遇到不顺利的事时，可以记在这里。",
      "needWhat": "请写“发生了什么”",
      "none": "(无)",
      "exportHint": "导出时，请把别人的名字、公司名等隐去。"
    },
    "call": {
      "title": "通话中",
      "hint": "边听电话边填4栏。数字会放大显示。只保留最近5条。",
      "f": [
        "谁打来",
        "什么事",
        "期限",
        "回电给谁"
      ],
      "fPh": [
        "公司名·名字",
        "简单几个字",
        "日期·时间",
        "电话号码·名字"
      ],
      "save": "保存这通电话",
      "clear": "清空各栏",
      "clearConfirm": "真的要清空各栏吗？",
      "show": "放大查看",
      "recent": "最近的电话(最多5条)",
      "empty": "还没有。",
      "needAny": "请至少填写一栏",
      "askBack": "请对方再说一遍时的说法",
      "askPhrases": [
        "请再慢慢说一遍",
        "可以用文字发给我吗",
        "我稍后回电，请告诉我电话号码",
        "我确认一下再打回去"
      ]
    }
  }
});
/* ---- /zh ---- */
/* ---- ar: 翻訳 ---- */
TBL.ar = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "دليل المواقف - SOYOGI",
    "short": "دليل المواقف",
    "tagline": "دليلك الخاص، للرجوع إليه قبل الدخول في أي موقف."
  },
  "nav": {
    "home": "الرئيسية",
    "bamen": "المواقف",
    "after": "لاحقًا",
    "call": "أثناء المكالمة",
    "set": "الإعدادات"
  },
  "common": {
    "ok": "موافق",
    "cancel": "إلغاء",
    "save": "حفظ",
    "del": "حذف",
    "back": "رجوع",
    "close": "إغلاق",
    "yes": "نعم",
    "no": "لا",
    "add": "إضافة",
    "edit": "تعديل",
    "next": "التالي",
    "prev": "السابق",
    "done": "تم",
    "saved": "تم الحفظ ✓",
    "saveFail": "تعذّر الحفظ",
    "storageFull": "المساحة ممتلئة، تعذّر الحفظ",
    "deleted": "تم الحذف",
    "delConfirm": "هل تريد الحذف حقًا؟",
    "empty": "لا يوجد شيء بعد",
    "backConfirm": "ما كتبته لم يُحفظ بعد. هل تريد تجاهله والرجوع؟",
    "optional": "ليس من الضروري ملء كل شيء.",
    "today": "اليوم",
    "tags": {
      "all": "الكل",
      "work": "العمل",
      "school": "المدرسة",
      "hospital": "المستشفى",
      "shop": "المتجر",
      "family": "العائلة",
      "phone": "الهاتف",
      "rule": "مجموعة قواعدي"
    },
    "tagLabel": "الموقف",
    "emptyTag": "لا يوجد شيء في «{t}» بعد.",
    "exp": {
      "btn": "تصدير كنص",
      "hint": "قبل النسخ، يُرجى إخفاء أسماء الآخرين وأسماء الشركات وأرقام الهواتف هنا. ما تغيّره هنا لا يغيّر ما حفظته.",
      "copy": "نسخ",
      "copied": "تم النسخ ✓",
      "copyFail": "تعذّر النسخ. يُرجى تحديد النص ونسخه."
    },
    "photo": {
      "camera": "التقاط صورة بالكاميرا",
      "roll": "اختيار من الصور",
      "cropTitle": "قصّ الصورة",
      "cropHint": "يمكن تحريك الصورة بالإصبع أو ضبطها بالأسهم، ثم تغيير الحجم بشريط التمرير.",
      "zoom": "الحجم",
      "panUp": "إلى الأعلى",
      "panDown": "إلى الأسفل",
      "panLeft": "إلى اليسار",
      "panRight": "إلى اليمين",
      "make": "اعتماد هذا",
      "fail": "تعذّر تحميل الصورة"
    }
  },
  "set": {
    "hNormal": "الإعدادات المعتادة",
    "hBackup": "تغيير الهاتف (نسخة احتياطية)",
    "fs": "حجم الخط",
    "fsSizes": [
      "عادي",
      "كبير",
      "كبير جدًا"
    ],
    "lang": "ことば / Language",
    "theme": "اللون",
    "themes": [
      "أخضر",
      "أزرق فاتح",
      "أبيض",
      "أسود"
    ],
    "bgm": "موسيقى الخلفية",
    "bgms": [
      "بدون",
      "نغمة خضراء",
      "نغمة زرقاء"
    ],
    "sound": "صوت اللمس",
    "on": "تشغيل",
    "off": "إيقاف",
    "bkHint": "عند الانتقال إلى هاتف جديد، يُرجى الضغط على «تصدير» لحفظ ملف، ثم الضغط على «استيراد» في الهاتف الجديد.",
    "bkExport": "تصدير",
    "bkImport": "استيراد",
    "exported": "تم التصدير ✓",
    "imported": "تم الاستيراد ✓",
    "importFail": "تعذّر الاستيراد",
    "importConfirm": "سيُستبدَل المحتوى الحالي بمحتوى الملف. هل تريد الاستيراد؟",
    "note": "كل ما يُكتب يُحفظ على هذا الجهاز فقط، ولا يُرسَل إلى أي مكان.",
    "privacy": "سياسة الخصوصية",
    "credit": "تطوير التطبيق: SOYOGI، مساحة للاستشارة في الرعاية والدعم"
  },
  "guide": {
    "title": "طريقة الاستخدام",
    "step": "{n} / {m}",
    "start": "ابدأ",
    "again": "عرض مرة أخرى",
    "heads": [
      "مرحبًا بك في دليل المواقف",
      "الرئيسية والتبويبات في الأسفل",
      "قاموس العبارات",
      "سيناريوهاتي",
      "المراجعة قبل الكلام",
      "الكتابة لاحقًا",
      "أثناء المكالمة",
      "في هذا الجهاز فقط"
    ],
    "bodies": [
      "دليلك الخاص: ترجع إليه قبل الدخول في موقف، وتكتب فيه بعد أن لا يسير أمر ما على ما يرام.\nهو أداة لمن يميل إلى فهم الكلام حرفيًّا، أو لمن يريد الاستعداد بمفرده دون التدرّب أمام الآخرين.\nلا شيء هنا يلومك أو يحكم على الصواب والخطأ. ولا تحتاج إلى ضبط أي شيء في البداية.",
      "في «الرئيسية»، «اختيار موقف» لما قبل الدخول في موقف، وفيه «قاموس العبارات» و«سيناريوهاتي» و«المراجعة قبل الكلام».\n«الكتابة لاحقًا» لما بعد أن لا يسير أمر ما جيدًا، و«أثناء المكالمة» للتدوين وأنت تستمع إلى الهاتف.\nتفتح التبويبات في الأسفل «المواقف» و«لاحقًا» و«أثناء المكالمة» الشاشات نفسها.",
      "ابحث عن عبارات تُسمع كثيرًا (باللغة اليابانية فقط)، بالكتابة في «البحث بكلمة» أو بأزرار المواقف.\nاضغط على عبارة لترى «المعنى الحرفي» و«المعاني الشائعة (احتمالات)» و«عبارة قصيرة للتأكد».\nيختلف المعنى بحسب الشخص والوقت. عند التردد، يبقى السؤال للتأكد هو أفضل طريقة.\nيبدأ «كتابة سيناريو لهذه العبارة» سيناريو جديدًا مباشرة.",
      "اكتب لكل موقف ما تقوله وما تفعله. واجمع القواعد التي قررتها لنفسك في «مجموعة قواعدي».\nاضغط «كتابة جديدة»، واملأ الموقف والعنوان والسيناريو، ثم اضغط «حفظ».\nافتح سيناريو محفوظًا واضغط «عرض بحجم كبير» لتقرأه بخط كبير في مكانه.",
      "اكتب ما تنوي قوله، ثم اضغط «بدء المراجعة».\nأجب بالترتيب عن 4 أسئلة بالضغط على «التالي»: الطرف الآخر، المكان، الوقت، كيف قد يشعر الطرف الآخر. لا حاجة إلى الجزم.\nاضغط «إعادة النظر» لترى الإجابات الأربع معًا، ثم اختر «حفظ هذه المراجعة» أو «إنهاء دون حفظ».",
      "سجّل ما لم ينجح دون لوم، في 4 خطوات: «ما الذي حدث» و«ما انتبهتُ إليه لاحقًا» و«ما سأجرّبه في المرة القادمة» و«ما يمكنني طلبه من غيري».\nاضغط «كتابة جديدة»، واختر الموقف واكتب، ثم اضغط «حفظ». ويمكنك لاحقًا القراءة حسب الموقف.\nيتيح «تصدير كنص» أسفل القائمة نسخ المحتوى نصًّا. أخفِ أسماء الآخرين وأسماء الشركات قبل النسخ.",
      "أثناء الاستماع إلى المكالمة، اكتب في الخانات الأربع: «المتصل» و«الموضوع» و«حتى متى» و«جهة معاودة الاتصال». ما تكتبه يبقى حتى لو انتقلت إلى شاشة أخرى.\nيعرضه «عرض بحجم كبير» بخط كبير، ويحفظه «حفظ هذه المكالمة» في «المكالمات الأخيرة» (حتى 5).\nلا يُفرغ «إفراغ الخانات» الخانات إلا بعد الضغط أيضًا على «نعم».\nاضغط على إحدى «عبارات لطلب الإعادة» لتظهر بخط كبير.",
      "كل ما تكتبه يُحفظ على هذا الجهاز فقط، ولا يُرسَل إلى أي مكان.\nعند الانتقال إلى هاتف جديد، اضغط «تصدير» في «الإعدادات» لحفظ ملف، ثم اضغط «استيراد» على الهاتف الجديد.\nيجعل «حجم الخط» و«اللون» في «الإعدادات» الشاشة أسهل للقراءة. تُختار اللغة من «Language» في أعلى الشاشة.\nيمكنك عرض هذا الدليل مرة أخرى من «الإعدادات»، بالضغط على «عرض مرة أخرى» بجانب «طريقة الاستخدام»."
    ]
  },
  "screen": {
    "home": {
      "title": "دليل المواقف",
      "bamen": "اختيار موقف",
      "bamenSub": "قاموس العبارات، سيناريوهاتي، المراجعة قبل الكلام",
      "after": "الكتابة لاحقًا",
      "afterSub": "ما الذي حدث ← ما سأجرّبه في المرة القادمة",
      "call": "أثناء المكالمة",
      "callSub": "من المتصل، الموضوع، حتى متى، معاودة الاتصال",
      "note": "ما يُكتب هنا يبقى على هذا الجهاز فقط."
    },
    "bamen": {
      "title": "اختيار موقف",
      "hint": "قبل الدخول في الموقف، يُرجى اختيار واحد.",
      "dict": "قاموس العبارات",
      "dictSub": "المعنى الحرفي / المعاني الشائعة / طريقة التأكد",
      "dictJaOnly": "(باللغة اليابانية فقط)",
      "script": "سيناريوهاتي",
      "scriptSub": "تُكتب وتُجمع لكل موقف (مجموعة قواعدي هنا أيضًا)",
      "precheck": "المراجعة قبل الكلام",
      "precheckSub": "الطرف الآخر، المكان، الوقت، كيف قد يشعر الطرف الآخر"
    },
    "dict": {
      "title": "قاموس العبارات",
      "search": "البحث بكلمة",
      "searchPh": "مثلًا «検討» أو «また»",
      "count": "عدد العبارات: {n}",
      "lit": "المعنى الحرفي",
      "maybe": "المعاني الشائعة (احتمالات)",
      "ask": "عبارة قصيرة للتأكد",
      "caution": "يختلف المعنى بحسب الشخص والوقت. ما هنا مجرد «احتمالات شائعة». عند التردد، يبقى السؤال للتأكد هو أفضل طريقة.",
      "jaOnly": "هذا القاموس باللغة اليابانية فقط.",
      "noHit": "لم يُعثر على نتيجة. يمكنك تجربة البحث بكلمة أخرى.",
      "toScript": "كتابة سيناريو لهذه العبارة",
      "draftTitle": "عندما يقول لي أحدهم «{w}»"
    },
    "script": {
      "title": "سيناريوهاتي",
      "hint": "لكل موقف، يمكن هنا كتابة ما أقوله وما أفعله وجمعه. «مجموعة قواعدي» هي المكان الذي تُجمع فيه القواعد التي قررتُها لنفسي.",
      "add": "كتابة جديدة",
      "edit": "تعديل السيناريو",
      "tag": "الموقف",
      "name": "العنوان",
      "namePh": "مثلًا «عند سماع شرح الدواء في المستشفى»",
      "body": "السيناريو",
      "bodyPh": "ما أقوله وما أفعله بالترتيب.\nمثلًا «1. أقول اسمي 2. أذكر أمرًا واحدًا فقط 3. إن لم أفهم أقول \"مرة أخرى من فضلك\"»",
      "show": "عرض بحجم كبير",
      "empty": "لا توجد سيناريوهات بعد. يمكنك البدء من «كتابة جديدة».",
      "needName": "يُرجى كتابة العنوان"
    },
    "precheck": {
      "title": "المراجعة قبل الكلام",
      "hint": "يمكنك كتابة ما تنوي قوله، ثم الإجابة عن 4 أسئلة بالترتيب. الإجابات لمراجعتك الشخصية لاحقًا، والحفظ اختياري.",
      "say": "ما أنوي قوله",
      "sayPh": "مثلًا «أودّ أن يتولى أحد دوري في الأسبوع القادم»",
      "q": [
        "من هو الطرف الآخر؟",
        "أين المكان؟",
        "متى الوقت؟ (هل الطرف الآخر مشغول في ذلك الوقت؟)",
        "كيف قد يشعر الطرف الآخر عند سماع ذلك؟"
      ],
      "qPh": [
        "مثلًا «تاناكا من الفريق نفسه (اسم افتراضي)»",
        "مثلًا «غرفة الاستراحة»",
        "مثلًا «قرب نهاية استراحة الغداء»",
        "مثلًا «قد يكون الطلب المفاجئ مُربكًا»"
      ],
      "qHint": [
        "إن لم يكن الاسم معروفًا، فلا بأس بذكر الصفة (المدير، المعلّم، موظف الاستقبال).",
        "كتابة ما إذا كان حولكما أشخاص أو كنتما وحدكما تجعل الرجوع إليها أسهل.",
        "المقصود: هل يستطيع الطرف الآخر ترك ما في يده في ذلك الوقت؟",
        "لا داعي للجزم. يمكن الكتابة بصيغة «ربما»."
      ],
      "step": "{n} / 4",
      "start": "بدء المراجعة",
      "review": "إعادة النظر",
      "reviewTitle": "إعادة النظر",
      "reviewHint": "بالنظر إلى الإجابات الأربع، يمكنك التفكير في تغيير طريقة الكلام أو توقيته. ولا بأس بعدم التغيير أيضًا.",
      "redo": "مرة أخرى",
      "saveIt": "حفظ هذه المراجعة",
      "noSave": "إنهاء دون حفظ",
      "saved": "تم الحفظ. يمكنك الرجوع إليها من «المراجعة قبل الكلام» في «المواقف».",
      "history": "المراجعات المحفوظة (حتى 30)",
      "needSay": "يُرجى كتابة ما تنوي قوله",
      "unanswered": "(لم يُكتب بعد)",
      "quote": "«{s}»"
    },
    "after": {
      "title": "الكتابة لاحقًا (ما لم ينجح، والخطوة التالية)",
      "hint": "يمكنك تسجيل ما لم ينجح في 4 خطوات، دون لوم. ويمكن قراءته لاحقًا حسب وسم الموقف.",
      "add": "كتابة جديدة",
      "edit": "تعديل",
      "tag": "الموقف",
      "f": [
        "ما الذي حدث",
        "ما انتبهتُ إليه لاحقًا",
        "ما سأجرّبه في المرة القادمة",
        "ما يمكنني طلبه من غيري"
      ],
      "fPh": [
        "مثلًا «ظننتُ أن \"سندرس الأمر\" كلام جادّ، فبقيتُ أنتظر»",
        "مثلًا «ربما كانت طريقة مهذبة للرفض»",
        "مثلًا «في المرة القادمة أسأل: \"متى يمكنني أن أتوقع الرد؟\"»",
        "مثلًا «أسأل العائلة: \"ما رأيكم في هذا الرد؟\"»"
      ],
      "fHint": [
        "يُكتب ما حدث فقط. لا داعي لكتابة إن كان جيدًا أو سيئًا.",
        "يُكتب ما اتضح بعد مرور بعض الوقت.",
        "لا بأس بشيء صغير. شيء واحد فقط.",
        "إن كان هناك ما يمكن طلبه من الآخرين. وإن لم يكن، فلا بأس بتركه فارغًا."
      ],
      "show": "عرض بحجم كبير",
      "empty": "لا يوجد شيء بعد. عندما لا ينجح أمر ما، يمكنك تسجيله هنا.",
      "needWhat": "يُرجى كتابة «ما الذي حدث»",
      "none": "(لا شيء)",
      "exportHint": "عند التصدير، يُرجى إخفاء أسماء الآخرين وأسماء الشركات وما شابه ذلك."
    },
    "call": {
      "title": "أثناء المكالمة",
      "hint": "أثناء الاستماع إلى المكالمة، تُملأ 4 خانات. تظهر الأرقام بحجم كبير. تُحفظ آخر 5 مكالمات فقط.",
      "f": [
        "المتصل",
        "الموضوع",
        "حتى متى",
        "جهة معاودة الاتصال"
      ],
      "fPh": [
        "اسم الشركة، الاسم",
        "باختصار",
        "التاريخ، الوقت",
        "رقم الهاتف، الاسم"
      ],
      "save": "حفظ هذه المكالمة",
      "clear": "إفراغ الخانات",
      "clearConfirm": "هل تريد إفراغ الخانات حقًا؟",
      "show": "عرض بحجم كبير",
      "recent": "المكالمات الأخيرة (حتى 5)",
      "empty": "لا يوجد شيء بعد.",
      "needAny": "يُرجى ملء خانة واحدة على الأقل",
      "askBack": "عبارات لطلب الإعادة",
      "askPhrases": [
        "من فضلك، هل يمكن الإعادة مرة أخرى ببطء؟",
        "هل يمكن إرسالها كتابةً؟",
        "سأعاود الاتصال، هل يمكنني الحصول على رقم هاتفكم؟",
        "سأتحقق من الأمر ثم أعاود الاتصال بكم"
      ]
    }
  }
});
/* ---- /ar ---- */
/* 翻訳前の仮置き: de〜ar は en を流用する(翻訳Workflowで各言語を書いたらこの行より上に追加し、ここは残してよい) */
['de','fr','es','it','pt','nl','sv','ko','zh','ar'].forEach(function(l){
  if(!TBL[l]) TBL[l] = JSON.parse(JSON.stringify(en));
});
window.TEBIKI_I18N = TBL;
})();
