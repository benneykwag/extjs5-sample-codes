
<%@page import="java.util.Random;"%>
<%
Random oRandom = new Random();

    // 1~10까지의 정수를 랜덤하게 출력
    int i = oRandom.nextInt(10) + 1;


    %>
{
    success: false,
    data: [
        {
            "boardId": 11,
            "contentId": <%=i%>,
            "subject": "ExtJS에 대한 1번 질문입니다.<%=i%>",
            "content": "Model에 대한 궁금증.",
            "createEmail": "extjs1@mail.com",
            "createDate": '2013-12-03'
        },
        {
            "boardId": 11,
            "contentId": <%=i+1%>,
            "subject": "ExtJS에 대한 2번 질문입니다.<%=i%>",
            "content": "Model에 대한 궁금증.",
            "createEmail": "extjs1@mail.com",
            "createDate": '2013-12-13'
        },
        {
            "boardId": 11,
            "contentId": <%=i+2%>,
            "subject": "ExtJS에 대한 3번 질문입니다.<%=i%>",
            "content": "Model에 대한 궁금증.",
            "createEmail": "extjs1@mail.com",
            "createDate": '2013-12-02'
        }
    ]
}