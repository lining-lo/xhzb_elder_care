package com.xhzb.test;

import org.junit.jupiter.api.Test;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.ExtractedTextFormatter;
import org.springframework.ai.reader.TextReader;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.ParagraphPdfDocumentReader;
import org.springframework.ai.reader.pdf.config.PdfDocumentReaderConfig;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.core.io.InputStreamResource;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;

public class ETLTest {


    @Test
    public void testLoadText() throws FileNotFoundException {
        // 读取文件
        InputStreamResource resource = new InputStreamResource(new FileInputStream("D:\\abc.txt"));
        // 创建TextReader
        TextReader textReader = new TextReader(resource);

        //追加一点东西(自定义)
        textReader.getCustomMetadata().put("filename", "abc.txt");

        // 读取文件内容
        List<Document> documentList = textReader.read();
        for (Document document : documentList) {
            System.out.println(document.getFormattedContent());
        }
    }

    @Test
    public void testPDFByPage() throws FileNotFoundException {
        // 读取文件
        InputStreamResource resource = new InputStreamResource(new FileInputStream("D:\\护理员工工作手册.pdf"));

        PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(resource,
                PdfDocumentReaderConfig.builder()
                        .withPageTopMargin(0) // 设置页眉边距
                        .withPageExtractedTextFormatter(ExtractedTextFormatter.builder()
                                .withNumberOfTopTextLinesToDelete(0) // 删除页眉顶部的文本行数
                                .build())
                        .withPagesPerDocument(1) // 每个文档的页数
                        .build());

        System.out.println(pdfReader.read());
    }

    @Test
    public void testPDFByParagraph() throws FileNotFoundException {
        // 读取文件
        InputStreamResource resource = new InputStreamResource(new FileInputStream("D:\\护理员工工作手册.pdf"));

        ParagraphPdfDocumentReader pdfReader = new ParagraphPdfDocumentReader(resource,
                PdfDocumentReaderConfig.builder()
                        .withPageTopMargin(0) // 设置页眉边距
                        .withPageExtractedTextFormatter(ExtractedTextFormatter.builder()
                                .withNumberOfTopTextLinesToDelete(0) // 删除页眉顶部的文本行数
                                .build())
                        .withPagesPerDocument(1) // 每个文档的页数
                        .build());

        System.out.println(pdfReader.read());
    }

    @Test
    public void testTestSplitter() throws FileNotFoundException {

        // 读取文件
        InputStreamResource resource = new InputStreamResource(new FileInputStream("D:\\护理员工工作手册.pdf"));

        PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(resource,
                PdfDocumentReaderConfig.builder()
                        .withPageTopMargin(0) // 设置页眉边距
                        .withPageExtractedTextFormatter(ExtractedTextFormatter.builder()
                                .withNumberOfTopTextLinesToDelete(0) // 删除页眉顶部的文本行数
                                .build())
                        .withPagesPerDocument(1) // 每个文档的页数
                        .build());


        // 创建TextSplitter
        TextSplitter textSplitter = new TokenTextSplitter();
        System.out.println("分隔之前的文档数："+pdfReader.read().size());
        List<Document> documents = textSplitter.apply(pdfReader.read());
        System.out.println("分隔之后的文档数："+documents.size());
        System.out.println(documents);

    }
}