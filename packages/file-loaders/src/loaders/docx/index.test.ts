// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import { DocxLoader } from './index';

describe('DocxLoader', () => {
  const loader = new DocxLoader();

  describe('aggregateContent', () => {
    it('should aggregate content from multiple pages', async () => {
      const mockPages = [
        {
          charCount: 10,
          lineCount: 1,
          metadata: { pageNumber: 1 },
          pageContent: 'Page 1 content',
        },
        {
          charCount: 10,
          lineCount: 1,
          metadata: { pageNumber: 2 },
          pageContent: 'Page 2 content',
        },
      ];

      const result = await loader.aggregateContent(mockPages);

      expect(result).toBe('Page 1 content\n\nPage 2 content');
    });

    it('should handle empty pages array', async () => {
      const result = await loader.aggregateContent([]);

      expect(result).toBe('');
    });
  });

  describe('loadPages', () => {
    it('should handle errors gracefully', async () => {
      // This test doesn't require mocking since it tests error handling
      // The actual implementation will throw an error when file doesn't exist
      const pages = await loader.loadPages('/path/to/nonexistent.docx');

      expect(pages).toHaveLength(1);
      expect(pages[0].metadata.error).toContain('Failed to load DOCX file');
      expect(pages[0].charCount).toBe(0);
      expect(pages[0].lineCount).toBe(0);
      expect(pages[0].pageContent).toBe('');
    });
  });
});
