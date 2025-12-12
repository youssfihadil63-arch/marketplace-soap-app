package com.marketplace.soap.service;

import com.marketplace.soap.Product;
import com.marketplace.soap.model.ProductEntity;
import com.marketplace.soap.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findByActiveTrue()
                .stream()
                .map(this::convertToSoapProduct)
                .collect(Collectors.toList());
    }

    public Product getProductById(long id) {
        return productRepository.findById(id)
                .map(this::convertToSoapProduct)
                .orElse(null);
    }

    public Product createProduct(Product product) {
        ProductEntity entity = convertToEntity(product);
        ProductEntity saved = productRepository.save(entity);
        return convertToSoapProduct(saved);
    }

    public Product updateProduct(long id, Product productDetails) {
        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(productDetails.getName());
                    existing.setDescription(productDetails.getDescription());
                    existing.setPrice(productDetails.getPrice());
                    existing.setCategory(productDetails.getCategory());
                    existing.setStock(productDetails.getStock());
                    ProductEntity updated = productRepository.save(existing);
                    return convertToSoapProduct(updated);
                })
                .orElse(null);
    }

    public boolean deleteProduct(long id) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setActive(false);
                    productRepository.save(product);
                    return true;
                })
                .orElse(false);
    }

    private Product convertToSoapProduct(ProductEntity entity) {
        Product product = new Product();
        product.setId(entity.getId());
        product.setName(entity.getName());
        product.setDescription(entity.getDescription());
        product.setPrice(entity.getPrice());
        product.setCategory(entity.getCategory());
        product.setStock(entity.getStock());
        product.setActive(entity.getActive());
        return product;
    }

    private ProductEntity convertToEntity(Product soapProduct) {
        ProductEntity entity = new ProductEntity();
        entity.setName(soapProduct.getName());
        entity.setDescription(soapProduct.getDescription());
        entity.setPrice(soapProduct.getPrice());
        entity.setCategory(soapProduct.getCategory());
        entity.setStock(soapProduct.getStock());
        entity.setActive(soapProduct.isActive() != null ? soapProduct.isActive() : true);
        return entity;
    }
}