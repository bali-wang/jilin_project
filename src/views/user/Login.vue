<template>
  <div class="login">
    <div class="login_content">
      <div class="login_form">
        <div class="login_title">系统登录</div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          class="form_content"
        >
          <el-form-item prop="username" size="mini">
            <el-input
              style="color: #009581"
              type="text"
              prefix-icon="el-icon-s-custom"
              v-model="ruleForm.username"
              autocomplete="off"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" size="mini">
            <el-input
              style="color: #009581"
              type="password"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              placeholder="密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="imageCode" size="mini">
            <el-input
              type="text"
              v-model="ruleForm.imageCode"
              style="width: 60%"
              prefix-icon="el-icon-picture"
              placeholder="验证码"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              style="width: 100%"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <img
          :src="codeUrl"
          alt="加载失败"
          class="img_code"
          @click="createRandom"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import { Encrypt } from "@/utils/crypt";
import AES from "@/utils/AES";
export default {
  data() {
    return {
      codeUrl: "",
      requestKey: "",
      ruleForm: {
        username: "",
        password: "",
        imageCode: "",
        requestKey: ""
      },
      rules: {}
    };
  },
  methods: {
    ...mapActions(["Login"]),
    createRandom() {
      let str = "";
      for (var i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 10);
      }
      this.ruleForm.requestKey = str;
      this.codeUrl = `/webapi/code/image?requestKey=${str}`;
    },
    submitForm() {
      this.$refs.loginForm.validate(voild => {
        if (voild) {
          this.ruleForm = {
            ...this.ruleForm,
            password: AES.encrypt(
              this.ruleForm.password,
              "3clear7894561230",
              "3clear7894561230"
            )
          };
          this.Login(this.ruleForm).then(res => {
            console.log(res);
            this.$router.push({
              path: "/"
            });
          });
        }
      });
    }
  },
  mounted() {
    this.createRandom();
  }
};
</script>
<style lang="scss" scope>
.login {
  max-width: 1920px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 0;
  .login_content {
    position: relative;
    padding-top: 56.25%;
    background: url("../../assets/login.png");
    background-size: cover;
    background-position: center;
    .login_form {
      width: 22%;
      border-radius: 6px;
      background: #fff;
      position: absolute;
      top: 20%;
      right: 10%;
      .login_title {
        color: #009581;
        font-weight: 800;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        padding: 10px;
        margin: 10px;
        border-bottom: 1px solid #eee;
      }
      .form_content {
        padding: 10px 40px;
        width: 100%;
      }
    }
  }
  .img_code {
    position: absolute;
    top: 160px;
    right: 40px;
    cursor: pointer;
  }
}
</style>
