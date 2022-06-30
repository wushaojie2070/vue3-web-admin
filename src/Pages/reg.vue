<template>
  <div class="login-wrap">
    <div class="ms-title">北京华云慧通科技有限公司</div>
    <div class="ms-login">
      <h3 class="restop">用户注册</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nic">
          <el-input v-model="ruleForm.nic"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
          <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
          <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model.number="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.number="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="centerDialogVisible = true">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="请滑动滑块~" :visible.sync="centerDialogVisible" width="35%" center>
        <slide-verify :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" @success="onSuccess" @fail="onFail"
          style="margin: auto;" @refresh="onRefresh"></slide-verify>
        <el-tag v-if="msg" type="success">{{msg}}</el-tag>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    localStorageSetItem
  } from "../utils/index.js";
  import {
    isEmail,
    cellPhoneNumber,
    isPassword,
    chinese
  } from "../utils/regularVerification.js";
  export default {
    data() {
      var checkUser = (rule, value, callback) => {
        // console.log('user', value)
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else if (!/^[a-zA-Z0-9_-]{4,10}$/.test(value)) {
          return callback(new Error('用户名为4到10的字母或数字或下划线'));
        }
        callback()
      };
      var checkEmail = (rule, value, callback) => {
        // console.log('email', value)
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else if (!isEmail(value)) {
          return callback(new Error('邮箱格式为字母数字@下划线.符号'));
        }
        callback()
      };
      var validatePass = (rule, value, callback) => {
        // console.log('pass', value)
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (isPassword(value) != 200) {
          return callback(new Error('请输入仅包含数字、字母的6-18位密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        // console.log('pass2', value)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        // console.log('phone', value)
        if (!value) {
          return callback(new Error('请输入11位手机号'));
        } else if (cellPhoneNumber(value) != 200) {
          return callback(new Error('手机号格式不正确'));
        }
        callback()
      };
      var checkNic = (rule, value, callback) => {
        // console.log('nic', value)
        if (!value) {
          return callback(new Error('请输入全中文昵称'));
        } else if (chinese(value) != 200) {
          return callback(new Error('昵称应为全中文'));
        }
        callback()
      };
      return {
        centerDialogVisible: false,
        msg: '',
        ruleForm: {
          pass: '',
          checkPass: '',
          // age: '',
          email: "",
          nic: "",
          phone: ""
        },
        rules: {
          pass: [{
            validator: validatePass,
            trigger: ['blur', 'change']
          }],
          phone: [{
            validator: checkPhone,
            trigger: ['blur', 'change']
          }],
          nic: [{
            validator: checkNic,
            trigger: ['blur', 'change']
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: ['blur', 'change']
          }],
          user: [{
            validator: checkUser,
            trigger: ['blur', 'change']
          }],
          email: [{
            validator: checkEmail,
            trigger: ['blur', 'change']
          }],
        }
      };
    },
    methods: {
      onSuccess() {
        this.msg = '验证通过√';
        var that = this;
        setTimeout(() => {
          that.centerDialogVisible = false;
          this.submitForm('ruleForm');
          this.msg = ''
        }, 1000);
      },
      onFail() {
        this.msg = ''
      },
      onRefresh() {
        this.msg = ''
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style scoped>
  .demo-ruleForm {
    text-align: center;
    width: 500px;
    margin-left: -80px;
  }

  .login-wrap {
    width: 100%;
    height: calc(100vh);
    background: rgb(50, 65, 87);
    display: flex;
    flex-direction: column;
  }

  .ms-title {
    margin-top: calc(20vh);
    text-align: center;
    font-size: 30px;
    color: #fff;
    margin-bottom: calc(7vh);
  }

  .ms-login {
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    width: 520px;
    height: 380px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .reg-btn {
    text-align: center;
    margin-top: 17px;
  }

  .reg-btn button {
    width: 100%;
    height: 36px;
  }

  .restop {
    margin-top: 0;
    text-align: center;
  }
</style>
