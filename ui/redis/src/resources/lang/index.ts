import { createI18n } from 'vue-i18n';
import { useAppStore } from '../../store';
// 语言包文件
import zh_CN from './zh_CN';
import en_ES from './en_ES';
import zh_TW from './zh_TW';

// 语言列表
export enum language {
  zh_CN = '简体中文',
  zh_HK = '繁体中文（中国香港）',
  zh_TW = '繁体中文（中国台湾）',
  ar_EG = '阿拉伯语',
  az_AZ = '阿塞拜疆语',
  bg_BG = '保加利亚语',
  bn_BD = '孟加拉语（孟加拉国）',
  by_BY = '白俄罗斯语',
  ca_ES = '加泰罗尼亚语',
  cs_CZ = '捷克语',
  da_DK = '丹麦语',
  de_DE = '德语',
  el_GR = '希腊语',
  en_GB = '英语',
  en_US = '英语（美式）',
  es_ES = '西班牙语',
  et_EE = '爱沙尼亚语',
  fa_IR = '波斯语',
  fi_FI = '芬兰语',
  fr_BE = '法语（比利时）',
  fr_CA = '法语（加拿大）',
  fr_FR = '法语（法国）',
  ga_IE = '爱尔兰语',
  he_IL = '希伯来语',
  hi_IN = '印地语',
  hr_HR = '克罗地亚语',
  hu_HU = '匈牙利语',
  hy_AM = '亚美尼亚语',
  id_ID = '印度尼西亚语',
  it_IT = '意大利语',
  is_IS = '冰岛语',
  ja_JP = '日语',
  ka_GE = '格鲁吉亚语',
  km_KH = '高棉语',
  kmr_IQ = '北库尔德语',
  kn_IN = '卡纳达语',
  kk_KZ = '哈萨克语',
  ko_KR = '韩语/朝鲜语',
  lt_LT = '立陶宛语',
  lv_LV = '拉脱维亚语',
  mk_MK = '马其顿语',
  ml_IN = '马拉雅拉姆语',
  mn_MN = '蒙古语',
  ms_MY = '马来语',
  nb_NO = '挪威语',
  ne_NP = '尼泊尔语',
  nl_BE = '荷兰语（比利时）',
  nl_NL = '荷兰语',
  pl_PL = '波兰语',
  pt_BR = '葡萄牙语(巴西)',
  pt_PT = '葡萄牙语',
  ro_RO = '罗马尼亚语',
  ru_RU = '俄语',
  sr_RS = '塞尔维亚语',
  sk_SK = '斯洛伐克语',
  sl_SI = '斯洛文尼亚语',
  sv_SE = '瑞典语',
  ta_IN = '泰米尔语',
  th_TH = '泰语',
  tr_TR = '土耳其语',
  ur_PK = '乌尔都语 (巴基斯坦)',
  uk_UA = '乌克兰语',
  vi_VN = '越南语',
}

// 导入语言文件
const messages = {
  zh_CN: { ...zh_CN },
  zh_TW: { ...zh_TW },
  en_ES: { ...en_ES },
};

export const setupI18n = {
  install(app) {
    const langStore = useAppStore();
   let i18n = createI18n({
      //如果设置true, $t() 函数将注册到全局
      globalInjection: true,
      //如果想在composition api中使用需要设置为false,
      legacy: false,
      locale: langStore.getLang(),
      fallbackLocale: 'zh_CN',
      messages,
    });
    app.use(i18n);
  },
};
