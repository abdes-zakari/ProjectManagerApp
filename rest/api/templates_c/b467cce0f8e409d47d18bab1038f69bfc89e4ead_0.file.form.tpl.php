<?php
/* Smarty version 3.1.32, created on 2019-02-10 12:20:33
  from 'C:\laragon\www\ProjectManger\api\App\Views\tp\form.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_5c6017110c0501_42291899',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b467cce0f8e409d47d18bab1038f69bfc89e4ead' => 
    array (
      0 => 'C:\\laragon\\www\\ProjectManger\\api\\App\\Views\\tp\\form.tpl',
      1 => 1549801223,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5c6017110c0501_42291899 (Smarty_Internal_Template $_smarty_tpl) {
?><center>
    <form method="POST" action="http://localhost/ProjectManger/api/project/add">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form> 
</center><?php }
}
