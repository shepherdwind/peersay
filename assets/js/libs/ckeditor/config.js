/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
  config.toolbar = 'Efly';
  config.toolbar_Efly = 
    [
        ['Preview','Cut','Copy','Paste','PasteText','PasteFromWord','Undo','Redo','Find'],
        ['Image','Link','Unlink','Anchor','Table','HorizontalRule','SpecialChar'],
        ['Maximize','SelectAll','RemoveFormat','Source','About'],
        '/',
        ['Bold','Italic','Strike','TextColor','NumberedList','BulletedList'],
        ['Format','Font','FontSize'],
        ['JustifyLeft','JustifyCenter','JustifyRight','Outdent','Indent']
    ];
  
  config.font_names = '宋体/宋体;黑体/黑体;仿宋/仿宋 _GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;'+ config.font_names ;
  config.fontSize_sizes = '10/10px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;28/28px;32/32px;48/48px;';
  //config.filebrowserUploadUrl = 'http://localhost/eweb/upload/do_upload';
  config.resize_enabled = false;
  config.extraPlugins = 'filebrowser';
  //config.skin = 'office2003';
  //config.extraPlugins = 'apage';
	// config.uiColor = 'CornflowerBlue';
};
