import { queryChapter, updateChapter } from '../api/docs4dev';
import store from '../store';
import utils from './utils';

export default {
  async queryChapter({ chapterId, lang }) {
    const { chapter } = await queryChapter({
      chapterId,
      lang,
    });
    const item = {
      id: chapter.chapterId.toString(),
      name: utils.sanitizeFilename(chapter.title),
      parentId: null,
      lang,
      version: chapter.version,
      chatType: chapter.type,
      code: chapter.code,
      uri: chapter.uri,
    };
    const content = {
      id: `${chapterId}/content`,
      text: utils.sanitizeText(chapter.content),
      properties: utils.sanitizeText(store.getters['data/computedSettings'].newFileProperties),
      discussions: {},
      comments: {},
    };
    store.commit('content/setItem', content);
    store.commit('file/setItem', item);
    store.commit('file/setCurrentId', chapterId.toString());
  },
  requestSave() {
    const { id, name, lang } = store.getters['file/current'];
    const { text } = store.getters['content/current'];
    updateChapter({
      chapter: {
        id,
        title: name,
        content: text,
        lang,
      },
    }).then((res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        store.dispatch('notification/info', '修改成功！');
      } else {
        store.dispatch('notification/error', '修改失败！');
      }
    }).catch(() => {
      store.dispatch('notification/error', '修改失败!');
    });
  },
};
