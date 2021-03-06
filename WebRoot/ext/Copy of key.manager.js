/**
radiogroup 获取值
*/
Ext.override(Ext.form.RadioGroup , {
	getValue:function(){
		var v;
		if(this.rendered){
			this.items.each(function(item){
				if(!item.getValue())
					return true;
				v = item.inputValue;
				return false;
				
			});
		}else{
			for(var k in this.items){
				if(this.items[k].checked){
					v = this.items[k].inputValue();
					break;
				}
			}
		}
		return v;
	}
});

Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = 'ext/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var ds = new Ext.data.JsonStore({
		url:'dogAction!find.do',
		root:'data',
		totalProperty:'total',
		fields:[{
			name:'dogid'
		},{
			name:'dogseed'
		},{
			name:'dogkey'
		},{
			name:'user'
		},{
			name:'isLocked'
		},{
			name:'url'
		}],
		baseParams:{'keyid':''},
		autoLoad:true
	});
	
	var cm = new Ext.grid.ColumnModel({
		columns:[new Ext.grid.RowNumberer() , {
			header:'狗',
			dataIndex:'dogid',
			align:'left',
			width:220
		},{
			header:'种子',
			dataIndex:'dogseed',
			align:'left',
			width:230
		},{
			header:'密钥',
			dataIndex:'dogkey',
			align:'left',
			width:180
		},{
			header:'用户',
			dataIndex:'user',
			align:'left',
			renderer:function(val){
				return (val == null || val == "")?"":val.realName;
			},
			width:100
		},{
			header:'状态',
			align:'left',
			dataIndex:'isLocked',
			renderer:function(val){
				return (val == 0)?"正常":"被锁";
			}
		},{
			header:'路径',
			align:'left',
			dataIndex:'url',
			id:'url',
			width:220
		}]
	});
	
	var tbar = new Ext.Toolbar({
		items:['狗号',{
			xtype:'textfield',
			width:250,
			name:'keyid',
			id:'keyid'
		},{
			text:'获取狗号',
			handler:function(){
				
					//var key = IA300_AdminGetUID();//管理员
					
					var key = IA300_GetHardwareId();//客户端
					if(key != ""){
						Ext.getCmp('keyid').setValue(key);
					}else{
						Ext.Msg.alert("警告" , "获取失败! 插件是否安装,U盾是否插入");
					}				
			
				
			}
		},{
			text:'查询',
			handler:function(){
			//根据ID获得文本框的值
				var data = Ext.getCmp('keyid').getValue();
				key.getStore().baseParams.keyid = data;//为参数名指定参数值
				key.getStore().reload();//刷新
			}
		},{
			text:'指定',
			handler:function(btn){
				var admin = DetectIA300AdminPlugin();//管理员插件
				if(admin == true){
					var recs = key.getSelectionModel().getSelections();
					if(recs.length != 1){
						Ext.Msg.alert("提示" , "请选中一项..谢谢..");
						return;
					}
					new User({app:key}).show(btn.getEl());
				}else{
					Ext.Msg.alert("警告" , "你不是管理员");
				}
			}
		},{
			text:'清空用户',
			handler:function(){
				var admin = DetectIA300AdminPlugin();//管理员插件
				if(admin == true){
					var recs = key.getSelectionModel().getSelections();
					if(recs.length != 1){
						Ext.Msg.alert("提示" , "请选中一项..谢谢..");
						return;
					}
					var user = recs[0].data.user;
					if(user == null || user == ""){
						Ext.Msg.alert("提示" , "该条语句 不用更新");
						return;
					}
					//alert(recs[0].data.dogid);
					Ext.Msg.confirm("提示" , "确定要更新这一条语句" , function(btn){
						if(btn=='yes'){
							Ext.Ajax.request({
								params:{'keyid':recs[0].data.dogid},
								url:'dogAction!del.do',
								method:'POST',
								success:function(resp , opts){
									Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
									key.getStore().reload();
								},
								failure:function(resp , opts){
									Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
								}
							});
						}
					});
				}else{
					Ext.Msg.alert("警告" , "你不是管理员");
				}
			}
		},{
			text:'物理删除',
			handler:function(){
				var admin = DetectIA300AdminPlugin();
				if(admin == true){
					var recs = key.getSelectionModel().getSelections();
					if(recs.length != 1){
						Ext.Msg.alert("提示" , "请选中一项..谢谢..");
						return;
					}
					//alert(recs[0].data.dogid);
					Ext.Msg.confirm("警告" , "确认要删除..." , function(btn){
						if(btn=='yes'){
							Ext.Ajax.request({
								params:{'keyid':recs[0].data.dogid},
								url:'dogAction!phydel.do',
								method:'POST',
								success:function(resp , opts){
									Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
									key.getStore().reload();
								},
								failure:function(resp , opts){
									Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
								}
							});
						}
					});
				}else{
					Ext.Msg.alert("警告" , "你不是管理员");
				}
			}
		},{
			text:'修改密码',
			handler:function(btn){
				var admin = DetectIA300Plugin();
				if(admin == true){
					new ModifyPwd().show(btn.getEl());
				}else{
					Ext.Msg.alert("警告" , "IA300CLient插件未安装");
				}
			}
		},{
			text:'重置密码',
			handler:function(){
				var admin = DetectIA300AdminPlugin();
				if(admin == true){
					alert("在操作之时请不要拨出U盾 ... 谢谢");
					Ext.Msg.confirm("警告" , "确定要重置密码..."  , function(btn){
						if(btn == 'yes'){
							try {
								if(IA300_CheckExist() < 1){
									alert("请插入USB Key");
									return;
								}
						    	
						        var uid = IA300_GetHardwareId();
						        if(uid=="" || uid == null) {
						         	alert("获取硬件ID失败！");
						         	return;
						        }
						        var requestInfo = IA300_ResetPasswordRequest();
						        if(requestInfo == "" || requestInfo == null){
						        	alert("申请失败，错误码："+IA300_GetLastError());
						        	return;
						        }
						        
						        Ext.Ajax.request({
						        	url:'dogAction!reset.do',
						        	params:{'keyid':uid , 'reqinfo':requestInfo},
						        	success:function(resp , opts){
						        		//
							        	try {
							        		var arr = Ext.util.JSON.decode(resp.responseText).msg.split(",");
							        		//alert(arr[0]+"\t"+IA300_GetHardwareId()+"\t"+(arr[0] == IA300_GetHardwareId()));
							        		
							        		if(arr[0] != IA300_GetHardwareId()){
							        			alert("请插入正确的USB Key重置信息！");
							        			return;
							        		}
							        		var responseinfo = arr[1];
							        		//alert(responseinfo);
							        		//alert((null==responseinfo)||(""==responseinfo)||("null"==responseinfo));
							        		if((null==responseinfo)||(""==responseinfo)||("null"==responseinfo)){
									    		alert("处理找回密码失败. 请联系管理员!");
									    		return;
									    	}
							        		 var retVal = IA300_ResetPassword(responseinfo);
							 		        if (retVal == 0){
							 					alert( "您的密码已重置！新密码为：12345678 请重新登录谢谢！");
							 				}else{
							 					alert( "用户密码重置失败，请重新申请！Error:"+ IA300_GetLastError());
							 				}
										} catch (e) {
											Ext.Msg.alert("提示" , "请检测是否安装插件...");
										}
						        	},
						        	failure:function(resp , opts){
						        		Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
						        	}
						        });
						        
							} catch (e) {
								Ext.Msg.alert("提示" , "请检测是否安装插件...");
							}
						}
					});
				}else{
					Ext.Msg.alert("警告" , "请检测是否安装插件...");
				}
			}
		},{
			text:'解锁',
			handler:function(){
				var admin = DetectIA300AdminPlugin();
				if(admin == true){
					var recs = key.getSelectionModel().getSelections();
					if(recs.length != 1){
						Ext.Msg.alert("提示" , "请选中一项..谢谢..");
						return;
					}
					if(recs[0].data.isLocked == 0){
						Ext.Msg.alert("提示" , "该锁正常");
						return;
					}
					Ext.Ajax.request({
						params:{'keyid':recs[0].data.dogid},
						url:'dogAction!puk.do',
						method:'POST',
						success:function(resp , opts){
							Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
							key.getStore().reload();
						},
						failure:function(resp , opts){
							Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
						}
					});
				}else{
					Ext.Msg.alert("警告" , "你不是管理员");
				}
			}
		},{
			text:'注册',
			handler:function(btn){
				try {
					var admin = DetectIA300AdminPlugin();
					if(admin == true){
						new Dog({
							scope:key
						}).show(btn.getEl());
					}else{
						Ext.Msg.alert("警告" , "你不是管理员");
					}
				} catch (e) {
					Ext.Msg.alert("警告" , "你不是管理员");
				}
			}
		},{
			text:'导出',
			handler:function(){
				gridToExcel("key.xls");
			}
		}]
	});
	
	var bbar = new Ext.PagingToolbar({
		displayInfo:true,
		pageSize:15,
		emptyMsg:'无记录',
		displayMsg:'当前显示:第{0}条到第{1}的记录 共{2}条',
		store:ds
	});
	
	var key = new Ext.grid.GridPanel({
		store:ds,
		cm:cm,
		tbar:tbar,
		bbar:bbar,
		autoExpandColumn:'url'
	});
	
	new Ext.Viewport({
		layout:'fit',
		items:key
	});
	
	var gridToExcel = function(fileName){
		var self = this;
		
		var vExportContent = key.getExcelXml();
	    if (Ext.isIE8||Ext.isIE6 || Ext.isIE7 || Ext.isSafari || Ext.isSafari2 || Ext.isSafari3) {
	        var fd=Ext.get('frmDummy');
	        if (!fd) {
	            fd=Ext.DomHelper.append(Ext.getBody(),{tag:'form',method:'POST',id:'frmDummy',action:'dogAction!excel.do', target:'_blank',name:'frmDummy',cls:'x-hidden',cn:[
	                {tag:'input',name:'name',id:'name',type:'hidden'}, 
					{tag:'input',name:'exportContent',id:'exportContent',type:'hidden'}
	            ]},true);
	        }
			 fd.child('#name').set({value:fileName}); 
	        fd.child('#exportContent').set({value:vExportContent});
	        fd.dom.submit();
	    } else {
	        document.location = 'data:application/vnd.ms-excel;base64,'+Base64.encode(vExportContent);
	    }
			
	}
});



DogForm = Ext.extend(Ext.form.FormPanel , {
	constructor:function(cfg){
		if(!cfg) cfg = {};
		Ext.applyIf(cfg , {
			frame:true,
			labelWidth:80,
			labelAlign:'right',
			items:[{
				layout:'column',
				items:[{
					layout:'form',
					columnWidth:.9,
					items:[{
						xtype:'textfield',
						fieldLabel:'狗号',
						name:'dog.dogid',
						id:'dogid',
						width:260,
						blankText:'狗号不能为空',
						allowBlank:false
					}]
				},{
					layout:'form',
					columnWidth:.1,
					items:[{
						xtype:'button',
						//width:30,
						autoWidth:true,
						text:'狗号',
						handler:function(){
							try {
								var rtn = IA300_AdminCheckExist();
								if(0<rtn){
									var id = IA300_AdminGetUIDEx(0);
									if(id == ""){
										alert("获取Key硬件ID失败,错误码:"+IA300_AdminGetLastError());
									}else{
										
										Ext.getCmp('dogid').setValue(id);
									}
								}else{
									alert("未找到USB Key!");
									return;
								}
							} catch (e) {
								Ext.Msg.alert("提示" , "请检测是否安装插件...");
							}
						}
					}]
				}]
			},{
				layout:'column',
				items:[{
					layout:'form',
					columnWidth:.9,
					items:[{
						xtype:'textfield',
						fieldLabel:'种子',
						name:'dog.dogseed',
						id:'dogseed',
						width:260,
						blankText:'种子不能为空',
						allowBlank:false
					}]
				},{
					layout:'form',
					columnWidth:.1,
					items:[{
						xtype:'button',
						text:'种子',
						handler:function(){
							try {
								Ext.getCmp('dogseed').setValue(IA300_GenComplexPwd(32));
							} catch (e) {
								Ext.Msg.alert("提示" , "请检测是否安装插件...");
							}
						}
					}]
				}]
			},{
				layout:'column',
				items:[{
					layout:'form',
					columnWidth:.9,
					items:[{
						xtype:'textfield',
						fieldLabel:'密钥',
						name:'dog.dogkey',
						id:'dogkey',
						width:260,
						blankText:'密钥不能为空',
						allowBlank:false
					}]
				},{
					layout:'form',
					columnWidth:.1,
					items:[{
						xtype:'button',
						text:'密钥',
						handler:function(){
							try {
								Ext.getCmp('dogkey').setValue(IA300_GenComplexPwd(24));
							} catch (e) {
								Ext.Msg.alert("提示" , "请检测是否安装插件...");
							}
						}
					}]
				}]
			},{
				xtype:'textfield',
				fieldLabel:'网址',
				name:'dog.url',
				width:260
			},{
				xtype:'textfield',
				inputType:'password',
				name:'superpwd',
				fieldLabel:'超级密码',
				blankText:'超级不能为空',
				allowBlank:false,
				width:150
			},{
				xtype:'textfield',
				inputType:'password',
				name:'newsuper',
				fieldLabel:'新超级密码',
				width:150,
				blankText:'新超级密码不能为空',
				allowBlank:false
			},{
				xtype:'textfield',
				inputType:'password',
				name:'newconfirm',
				fieldLabel:'确认新密码',
				width:150,
				blankText:'确认新超级密码不能为空',
				allowBlank:false
			},{
				xtype:'textfield',
				inputType:'password',
				name:'dogpwd',
				fieldLabel:'U盾密码',
				width:150,
				blankText:'U盾密码不能为空',
				allowBlank:false
			},{
				xtype:'textfield',
				fieldLabel:'狗的别名',
				name:'dogname',
				width:150
			},{
				xtype:'textfield',
				fieldLabel:'公司名称',
				name:'company',
				width:150
			},{
				xtype:'textfield',
				fieldLabel:'备注信息',
				name:'remark',
				width:150
			},{
				xtype:'radiogroup',
				name:'browser',
				fieldLabel:'浏览器',
				items:[{
					xtype:'radio',
					inputValue:'1',
					boxLabel:'IE',
					name:'browser'
				},{
					xtype:'radio',
					inputValue:'0',
					boxLabel:'默认',
					checked:true,
					name:'browser'
				}]
			},{
				xtype:'panel',
				html:'在任务操作之前都务必把U盾插入 ,超级密码务必记住 !!! 谢谢...'
			}],
			buttonAlign:'center',
			buttons:[{
				text:'保存',
				handler:function(){
					self.submit();
				}
			},{
				text:'取消',
				
				handler:function(){
					self.scope.close();
				}
			}]
		});
		var self = this;
		
		DogForm.superclass.constructor.call(this, cfg)
	},
	submit:function(){
		var self = this;
		var val = self.getForm().getValues();
		//alert(Ext.encode(val));
		var newpwd = val.newsuper;
		var confirm = val.newconfirm;
		if(newpwd != confirm){
			Ext.Msg.alert("提示" , "新超级密码不一样");
			return;
		}
		
		if(self.getForm().isValid()){
			try {
				//alert(newpwd+"\n2"+val.dogpwd+"\n3"+val["dog.dogseed"]+"\n4"+val["dog.dogkey"]+"\n5"+val.dogname+"\n6"+val.company+"\n7"+val["dog.url"]+"\n8"+val.remark+"\n9"+val.browser);
				//return;
				var rtn = IA300_SetParameters(newpwd, val.dogpwd, val["dog.dogseed"], val["dog.dogkey"], val.dogname, val.company, val["dog.url"], val.remark, val.browser, 0);
				if(0 != rtn){
					alert("配置错误! 请重新配置参数 ");
					return;
				}
				
				
				var rtn = IA300_EditWithParametersEx(val["dog.dogid"], val.superpwd);
				if(0 != rtn){
					alert("本地写Key失败,错误码:"+IA300_AdminGetLastError());
					return;
				}
				
				self.getForm().submit({
					url:'dogAction!reg.do',
					waitMsg:'提示 正在提交 请稍候...',
					waitTitle:'提示',
					success:function(form , action){
						Ext.Msg.alert("提示" , action.result.msg);
						self.scope.scope.getStore().reload();
						self.scope.close();
					},
					failure:function(form , action){
						Ext.Msg.alert("提示" , action.result.msg);
					}
				});
			} catch (e) {
				Ext.Msg.alert("提示" , "请检测是否安装插件...");
			}
		}else{
			Ext.Msg.alert("提示" , "请填写完整信息...");
		}
	}
});





Dog= Ext.extend(Ext.Window ,{
	constructor:function(cfg){
		if(!cfg) cfg = {};
		Ext.applyIf(cfg , {
			title:'狗注册',
			modal:true,
			width:430,
			height:500,
			resizable:false,
			closeActon:'hide'
		});
		
		var self = this;
		
		self.layout = 'fit';
		self.items = new DogForm({
			scope:this
		});
		
		Dog.superclass.constructor.call(this , cfg);
	}
});

User = Ext.extend(Ext.Window , {
	
	constructor:function(cfg){
		if(!cfg) cfg = {};
		Ext.applyIf(cfg , {
			width:320,
			height:150,
			modal:true,
			border:false,
			resizable:false,
			bodyBorder:false,
			title:'指定用户'
		});
		var self = this;
		
		
		var form = new Ext.form.FormPanel({
			frame:true,
			labelWidth:80,
			labelAlign:'right',
			border:false,
			bodyBorder:false,
			items:[{
				xtype:'combo',
				hiddenName:'user',
				fieldLabel:'用户名',
				store:new Ext.data.JsonStore({
					url:'userAction!show.do',
					root:'data',
					totalProperty:'total',
					fields:[{
						name:'userid'
					},{
						name:'realName'
					}]
				}),
				valueField:'userid',
				displayField:'realName',
				mode:'remote',
				pageSize:20,
				allowBlank:false,
				listWidth:200,
				blankText:'用户名不能为空',
				triggerAction: 'all'
			}],
			buttonAlign:'center',
			buttons:[{
				text:'保存',
				handler:function(){
					self.submit();
				}
			},{
				text:'取消',
				handler:function(){
					self.close();
				}
			}]
		});
		self.form = form;

		self.layout = 'fit';
		self.items = form;
		
		User.superclass.constructor.call(this , cfg);
	},
	submit:function(){
		var self = this;
		var form = self.form.getForm();
		//alert(self.scope.getSelectionModel().getSelected().data.dogid);
		//alert(form.getValues().user);
		if(form.isValid()){
			Ext.Ajax.request({
				url:'dogAction!appoint.do',
				params:{'keyid':self.app.getSelectionModel().getSelected().data.dogid , 'user':form.getValues().user},
				success:function(resp , ots){
					Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
					self.app.getStore().reload();
					self.close();
				},
				failure:function(resp , ots){
					Ext.Msg.alert("提示" , Ext.util.JSON.decode(resp.responseText).msg);
				}
			});
		}else{
			Ext.Msg.alert("提示" , "请填写完整信息..");
		}
	}
});


ModifyPwd = Ext.extend(Ext.Window , {
	constructor:function(cfg){
		if(!cfg) cfg = {};
		Ext.applyIf(cfg , {
			title:'修改密码',
			modal:true,
			width:300,
			resizable:false,
			height:200
		});
		var self = this;
		
		var form = new Ext.form.FormPanel({
			frame:true,
			border:false,
			bodyBorder:false,
			labelWidth:80,
			labelAlign:'right',
			items:[{
				xtype:'textfield',
				inputType:'password',
				name:'oldpwd',
				fieldLabel:'旧密码',
				allowBlank:false,
				blankText:'旧密码不能为空'
			},{
				xtype:'textfield',
				inputType:'password',
				name:'newpwd',
				fieldLabel:'新密码',
				allowBlank:false,
				blankText:'新密码不能为空'
			},{
				xtype:'textfield',
				inputType:'password',
				name:'newtwo',
				allowBlank:false,
				blankText:'新密码不能为空',
				fieldLabel:'再输入'
			},{
				xtype:'panel',
				
				html:'请将一个U盾插入电脑  在操作<br/>之时请勿拨出U盾 谢谢...'
			}],
			buttons:[{
				text:'修改',
				handler:function(){
					self.submit();
				}
			},{
				text:'取消',
				handler:function(){
					self.close();
				}
			}],
			buttonAlign:'center'
		});
		self.form = form;
		
		self.layout = 'fit';
		self.items = form;
		
		ModifyPwd.superclass.constructor.call(this , cfg);
	},
	submit:function(){
		try {
			alert("警告:在修改密码时请不要把U盾拨出");
			var self = this;
			var form = self.form.getForm();
			if(form.isValid()){
				var pwd = form.getValues().newpwd;
				var two = form.getValues().newtwo;
				
				if(pwd == two){
					var rtn = IA300_CheckExist();
	    			if(rtn < 1){
	    				alert("查找IA300失败,错误码:"+IA300_GetLastError());
	    			}else{
	    				rtn = IA300_ChangePassword(form.getValues().oldpwd, pwd, two);
	    				if(rtn != 0){
	    					alert("修改密码失败,错误码:"+IA300_GetLastError());
	    				}else{
	    					self.close();
	    					alert("修改成功,请记住新密码");
	    				}
	    			}
				}else{
					Ext.Msg.alert("提示"  , "新密码输入不一样");
				}
			}else{
				Ext.Msg.alert("提示"  , "请填写完整信息...");
			}
		} catch (e) {
			Ext.Msg.alert("提示"  , "插件未装成功");
		}
	}
});



