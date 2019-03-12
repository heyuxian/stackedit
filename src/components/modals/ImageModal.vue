<template>
  <modal-inner aria-label="Insert image">
    <div class="modal__content">
      <file-pond
          name="file"
          ref="pond"
          label-idle="选择文件或拖拽文件到此处上传..."
          allow-multiple="false"
          accepted-file-types="image/jpeg, image/png"
          v-bind:files="myFiles"/>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">取消</button>
      <button class="button button--resolve" @click="resolve()">确定</button>
    </div>
  </modal-inner>
</template>

<script>
  // Import Vue FilePond
  import vueFilePond, { setOptions } from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import modalTemplate from './common/modalTemplate';

  let url = '';
  setOptions({
    server: {
      url: 'http://localhost:8300',
      process: {
        url: '/api/upload/filepond',
        method: 'POST',
        onload: (res) => {
          url = res;
        },
      },
    },
  });

  // Create component
  const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
  export default modalTemplate({
    components: {
      FilePond,
    },
    data: () => ({
      myFiles: [],
    }),
    methods: {
      resolve() {
        if (!url || url === '') {
          this.setError('url');
        } else {
          const { callback } = this.config;
          this.config.resolve();
          callback(url);
          url = '';
        }
      },
      reject() {
        const { callback } = this.config;
        this.config.reject();
        callback(null);
      },
    },
  });
</script>
