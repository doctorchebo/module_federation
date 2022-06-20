describe('pages/dashboard/components/activity.board/', () => {
	const draggable = true;
	describe('Board with drap and drop function', () => {
		test('is true', () => {
			expect(draggable).toBe(true);
		});

		test('is not false', () => {
			expect(draggable).not.toBe(false);
		});
	});
});
