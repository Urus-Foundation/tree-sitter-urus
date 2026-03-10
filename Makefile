.PHONY: generate parse fmt

generate:
	tree-sitter generate 

parse: generate
	tree-sitter parse examples/hello.urus

fmt:
	npm run fmt
