const mongoose = require('mongoose');
const Poetry = require('../models/Poetry');
require('dotenv').config({ path: '../config.env' });

// 示例诗词数据
const poetryData = [
  {
    id: '1',
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    contentLines: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'],
    tags: ['思乡', '月亮', '夜晚'],
    grade: 'primary',
    type: 'classic',
    length: 20,
    analysis: '这首诗以月光为线索，通过"疑是地上霜"的错觉，引出思乡之情。诗人运用白描手法，将思乡之情融入对月光的描写中，意境优美，情感真挚。',
    translation: '床前明亮的月光洒在地上，好像地上落了一层霜。抬头看看天上的明月，低头想起远方的家乡。',
    authorInfo: '李白（701年-762年），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。'
  },
  {
    id: '2',
    title: '春晓',
    author: '孟浩然',
    dynasty: '唐',
    content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
    contentLines: ['春眠不觉晓，', '处处闻啼鸟。', '夜来风雨声，', '花落知多少。'],
    tags: ['春天', '自然', '鸟鸣'],
    grade: 'primary',
    type: 'classic',
    length: 20,
    analysis: '这首诗描写了一个春天的早晨，诗人被鸟鸣声唤醒，想起昨夜的风雨，担心花朵的凋落。全诗语言清新自然，意境优美。',
    translation: '春天里贪睡不知不觉天已破晓，搅乱我酣眠的是那啁啾的小鸟。昨天夜里风声雨声一直不断，那娇美的春花不知被吹落了多少？',
    authorInfo: '孟浩然（689年-740年），唐代诗人，以山水田园诗著称，与王维并称"王孟"。'
  },
  {
    id: '3',
    title: '咏鹅',
    author: '骆宾王',
    dynasty: '唐',
    content: '鹅，鹅，鹅，曲项向天歌。白毛浮绿水，红掌拨清波。',
    contentLines: ['鹅，鹅，鹅，', '曲项向天歌。', '白毛浮绿水，', '红掌拨清波。'],
    tags: ['动物', '童趣', '鹅'],
    grade: 'primary',
    type: 'classic',
    length: 18,
    analysis: '这首诗生动地描绘了鹅的外形特征和动作，语言简洁明快，富有童趣。诗人运用白描手法，将鹅的形象刻画得栩栩如生。',
    translation: '鹅，鹅，鹅，弯着脖子朝天欢叫。洁白的羽毛漂浮在碧绿水面，红红的脚掌拨动着清清水波。',
    authorInfo: '骆宾王（约619年-约687年），唐代诗人，"初唐四杰"之一。'
  },
  {
    id: '4',
    title: '登鹳雀楼',
    author: '王之涣',
    dynasty: '唐',
    content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
    contentLines: ['白日依山尽，', '黄河入海流。', '欲穷千里目，', '更上一层楼。'],
    tags: ['登高', '壮志', '黄河'],
    grade: 'middle',
    type: 'classic',
    length: 20,
    analysis: '这首诗描写了诗人登楼远望的壮阔景象，表达了积极向上的人生态度。前两句写景，后两句抒情，意境开阔，气势磅礴。',
    translation: '夕阳依傍着西山慢慢地沉没，滔滔黄河朝着东海汹涌奔流。若想把千里的风光景物看够，那就要登上更高的一层城楼。',
    authorInfo: '王之涣（688年-742年），唐代诗人，以边塞诗著称。'
  },
  {
    id: '5',
    title: '望庐山瀑布',
    author: '李白',
    dynasty: '唐',
    content: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。',
    contentLines: ['日照香炉生紫烟，', '遥看瀑布挂前川。', '飞流直下三千尺，', '疑是银河落九天。'],
    tags: ['瀑布', '壮观', '庐山'],
    grade: 'middle',
    type: 'classic',
    length: 28,
    analysis: '这首诗以夸张的手法描绘了庐山瀑布的壮观景象，想象奇特，气势恢宏。诗人运用比喻和夸张，将瀑布比作银河，突出了瀑布的雄伟壮观。',
    translation: '香炉峰在阳光的照射下生起紫色烟霞，远远望见瀑布似白色绢绸悬挂在山前。高崖上飞腾直落的瀑布好像有几千尺，让人恍惚以为银河从天上泻落到人间。',
    authorInfo: '李白（701年-762年），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。'
  },
  {
    id: '6',
    title: '水调歌头·明月几时有',
    author: '苏轼',
    dynasty: '宋',
    tune: '水调歌头',
    content: '明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。',
    contentLines: ['明月几时有，把酒问青天。', '不知天上宫阙，今夕是何年。', '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。', '起舞弄清影，何似在人间。'],
    tags: ['思乡', '月亮', '哲理'],
    grade: 'high',
    type: 'songci',
    length: 50,
    analysis: '这首词以中秋赏月为背景，抒发了作者对人生的思考和对亲人的思念。词中既有对宇宙人生的哲理思考，又有对人间生活的热爱。',
    translation: '明月什么时候出现？我端着酒杯问青天。不知道天上的宫殿，今晚是哪一年。我想乘着清风回到天上，又怕在美玉砌成的楼宇中，经受不住高处的寒冷。在月光下起舞，影子也随人舞动，哪里比得上在人间。',
    authorInfo: '苏轼（1037年-1101年），字子瞻，号东坡居士，北宋文学家、政治家，唐宋八大家之一。'
  },
  {
    id: '7',
    title: '如梦令·昨夜雨疏风骤',
    author: '李清照',
    dynasty: '宋',
    tune: '如梦令',
    content: '昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦。',
    contentLines: ['昨夜雨疏风骤，', '浓睡不消残酒。', '试问卷帘人，却道海棠依旧。', '知否，知否？应是绿肥红瘦。'],
    tags: ['春天', '花', '惜春'],
    grade: 'high',
    type: 'songci',
    length: 33,
    analysis: '这首词描写了女词人对春天的珍惜和对美好事物的留恋。通过问答的形式，表达了词人对海棠花的关心和对春天逝去的惋惜。',
    translation: '昨夜雨虽然下得稀疏，风却刮得急猛，沉沉的酣睡却不能把残存的酒力全部消尽。问那正在卷帘的侍女，外面的情况如何，她说海棠花依然和昨天一样。你可知道，你可知道，这个时节应该是绿叶繁茂，红花凋零了。',
    authorInfo: '李清照（1084年-约1155年），号易安居士，宋代女词人，婉约词派代表，有"千古第一才女"之称。'
  },
  {
    id: '8',
    title: '天净沙·秋思',
    author: '马致远',
    dynasty: '元',
    tune: '天净沙',
    content: '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。夕阳西下，断肠人在天涯。',
    contentLines: ['枯藤老树昏鸦，', '小桥流水人家，', '古道西风瘦马。', '夕阳西下，', '断肠人在天涯。'],
    tags: ['秋天', '思乡', '漂泊'],
    grade: 'high',
    type: 'yuanqu',
    length: 28,
    analysis: '这首小令以简洁的笔触描绘了一幅秋日黄昏的图景，表达了游子思乡的愁绪。全曲意境萧瑟，情感深沉。',
    translation: '枯萎的藤蔓缠绕着老树，黄昏时分乌鸦在树上栖息。小桥下流水潺潺，旁边有几户人家。古老的道路上西风萧瑟，一匹瘦马在缓缓前行。夕阳西下，断肠的游子还在天涯漂泊。',
    authorInfo: '马致远（约1250年-约1321年），元代戏曲家、散曲家，"元曲四大家"之一。'
  }
];

async function initData() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('数据库连接成功');

    // 清空现有数据
    await Poetry.deleteMany({});
    console.log('已清空现有数据');

    // 插入新数据
    const result = await Poetry.insertMany(poetryData);
    console.log(`成功插入 ${result.length} 条诗词数据`);

    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('数据库连接已关闭');

  } catch (error) {
    console.error('初始化数据失败:', error);
    process.exit(1);
  }
}

// 运行初始化
initData();
