import {ERROR as VALIDATE_ERROR} from "koa-ik-validity/table";
export default {
	// 格式：来源方 模块 功能 类型
	// 例子： 500  10  002   04

	// 来源方
	// 500+ node

	// 模块
	// 00 认证
	// 01 文章
	// 10 抽奖
	// 99 杂项

	// 00 认证
	// 001 token
	5000000000: "加载首页失败",
	// 002 来源header
	5000000200: "来源header未检测到Authorization",
	5000000201: "来源header中Authorization格式有误",
	5000000202: "无效sso_token",
	5000000203: "请先登录一下",
	// 003 注册
	5000000300: "检验手机号是否被注册失败",
	5000000301: "密码加密失败",
	5000000302: "该手机号已经被注册",
	// 004 登录
	5000000400: "查询用户信息失败",
	5000000401: "该手机号尚未被注册",
	5000000402: "比对密码失败",
	5000000403: "手机号或密码输入错误",
	// 005 重置密码
	5000000500: "该手机号尚未被注册",
	5000000501: "查询用户数据时系统异常",
	5000000502: "密码加密失败",
	5000000503: "修改密码失败",
	// 006 用户行为检验
	5000000600: "缺少查询字段(sso_token)",
	5000000601: "无效sso_token",
	5000000602: "查询用户文章访问记录失败",
	// 007 用户行为匹配
	5000000700: "缺少查询字段(article_id)",
	5000000701: "查询用户浏览记录失败",
	5000000702: "用户并未有过此行为",

	// 01 文章
	// 000 文章分类
	5000100000: "获取文章类别数据失败",
	5000100001: "无效一级类目(sup_label)",
	5000100002: "二级类目(sub_label)缺失，不应只有一级类目",
	5000100003: "无效二级类目(sub_label)",
	// 001 随机列表
	5000100100: "获取随机文章列表失败",
	// 002 列表
	5000100200: "获取文章列表失败",
	// 003 详情
	5000100300: "加载文章详情页失败",
	5000100301: "获取文章详情数据失败",
	// 004 新增
	5000100400: "加载文章编辑页失败",
	5000100401: "新增文章失败",
	// 005 编辑
	5000100500: "不能编辑他人文章",
	5000100501: "编辑文章失败",
	// 006 删除
	5000100600: "删除文章失败",
	// 007 收藏点赞评论等记录
	5000100700: "查询收藏点赞评论等记录失败",
	// 008 收藏
	5000100800: "收藏文章失败",
	5000100801: "查询收藏情况失败",
	5000100802: "取消文章收藏失败",
	5000100803: "查询我的收藏的文章id失败",
	5000100804: "查询我的收藏失败",
	// 009 点赞
	5000100900: "赞赏文章失败",
	5000100901: "查询点赞情况失败",
	5000100902: "取消文章点赞失败",
	// 010 搜索
	5000101000: "查询搜索结果失败",
	// 011 推荐
	5000101100: "查询推荐文章失败",

	// 02 个人中心
	// 000 主页
	5000200000: "加载个人中心页失败",
	// 001 个人信息获取
	5000200100: "获取个人基本资料失败",
	5000200101: "获取作者基本资料失败",
	5000200102: "获取作者文章及关注信息失败",
	// 002 个人信息设置
	5000200200: "修改用户名失败",
	// 003 个人头像设置
	5000200300: "上传头像失败",
	5000200301: "更新头像失败",
	// 004 退出
	5000200400: "退出失败",

	// 03 用户关系
	// 000 查询关注信息
	5000300000: "获取关注作者列表的作者id失败",
	5000300001: "获取关注作者信息失败",
	// 001 关注
	5000300100: "关注作者失败",
	5000300101: "查询关注情况失败",
	5000300102: "取消关注作者失败",

	// 10 抽奖
	// 000 抽奖主页
	// 001 九宫格抽奖
	5001000100: "加载转盘抽奖页失败",
	5001000101: "获取奖品类别数据失败",
	5001000102: "获取抽奖结果数据失败",
	// 002 九宫格翻牌
	5001000200: "加载翻牌抽奖页失败",
	5001000201: "获取奖品类别数据失败",
	5001000202: "获取抽奖结果数据失败",
	
	// 97 统计
	5009700000: "执行统计失败",
	5009700001: "记录文章浏览记录失败",

	// 98 校验
	...VALIDATE_ERROR,

	// 99 杂项
	5009900000: "加载首页失败",
	5009900001: "加载404页面失败",
	5009900002: "获取测试svg失败",
	5009900003: "加载Punchy开发计划页失败",
	5009999999: "未知错误"
};